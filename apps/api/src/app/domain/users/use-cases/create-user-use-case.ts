import type { UserRequest } from '../io/user-request'
import type { UserResponse } from '../io/user-response'
import { eq } from 'drizzle-orm'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception'
import * as bcrypt from 'bcrypt'
import { Inject, Injectable } from '@nestjs/common'
import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import { usersTable } from '@/app/database/drizzle/schema'

@Injectable()
export class CreateUserUseCase implements IUseCase<UserRequest, UserResponse> {
  constructor(
    @Inject(DatabaseProvider) private readonly database: DatabaseProvider
  ) {}

  async handle({
    email,
    name,
    password,
    customerId,
  }: UserRequest): Promise<UserResponse> {
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
      .values({ email, name, passwordHash, customerId })
      .returning()

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    }
  }
}
