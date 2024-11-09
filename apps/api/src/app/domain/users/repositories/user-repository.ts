import type { Repository } from '@/app/database/repositories/repository'
import type { UserSchema } from '@/app/domain/users/schemas/user-schema'

export abstract class UserRepository implements Repository<string, UserSchema> {
  abstract create(data: UserSchema): Promise<UserSchema>
  abstract findById(id: string): Promise<UserSchema>
  abstract findByEmail(email: string): Promise<UserSchema | null>
  abstract findAll(): Promise<UserSchema[]>
  abstract update(id: string, data: Partial<UserSchema>): Promise<void>
  abstract delete(id: string): Promise<void>
}
