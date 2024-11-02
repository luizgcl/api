import type { IUseCase } from 'src/app/core/use-cases/generic-use-case'
import type { UserRequest } from '../io/user-request'
import type { UserResponse } from '../io/user-response'
import type { DatabaseProvider } from 'src/app/database/drizzle/database.provider'
import { usersTable } from 'src/app/database/drizzle/schema'
import { eq } from 'drizzle-orm'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception'
import * as bcrypt from 'bcrypt'

export class CreateUserUseCase implements IUseCase<UserRequest, UserResponse> {
  constructor(private readonly database: DatabaseProvider) {}

  async handle({ email, name, password }: UserRequest): Promise<UserResponse> {
    const [userWithSameEmail] = await this.database
      .getDatabase()
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    if (userWithSameEmail) {
      throw new UserAlreadyExistsException()
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const [user] = await this.database
      .getDatabase()
      .insert(usersTable)
      .values({ email, name, passwordHash })
      .returning()

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }
  }
}
