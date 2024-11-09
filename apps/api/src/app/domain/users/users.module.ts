import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/app/database/database.module'
import { DrizzleUserRepository } from '@/app/domain/users/repositories/drizzle-user-repository'
import { UserRepository } from '@/app/domain/users/repositories/user-repository'
import { UserController } from './controllers/user.controller'
import { CreateUserUseCase } from './use-cases/create-user-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    CreateUserUseCase,
  ],
})
export class UsersModule {}
