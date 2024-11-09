import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import { usersTable } from '@/app/database/drizzle/schema'
import type { UserRepository } from '@/app/domain/users/repositories/user-repository'
import type { UserSchema } from '@/app/domain/users/schemas/user-schema'
import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'

@Injectable()
export class DrizzleUserRepository implements UserRepository {
  constructor(
    @Inject(DatabaseProvider)
    private readonly database: DatabaseProvider
  ) {}

  async create(data: UserSchema): Promise<UserSchema> {
    const [user] = await this.database
      .getDatabase()
      .insert(usersTable)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        customerId: data.customerId,
      })
      .returning()

    return user
  }

  async findById(id: string): Promise<UserSchema> {
    const [user] = await this.database
      .getDatabase()
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))

    return user
  }

  async findByEmail(email: string): Promise<UserSchema | null> {
    const [user] = await this.database
      .getDatabase()
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    return user
  }

  async findAll(): Promise<UserSchema[]> {
    return this.database.getDatabase().select().from(usersTable)
  }

  async update(id: string, data: Partial<UserSchema>): Promise<void> {
    await this.database
      .getDatabase()
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
  }

  async delete(id: string): Promise<void> {
    await this.database
      .getDatabase()
      .delete(usersTable)
      .where(eq(usersTable.id, id))
  }
}
