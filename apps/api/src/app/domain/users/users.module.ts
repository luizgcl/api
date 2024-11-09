import { Module } from '@nestjs/common'

import { UserController } from './controllers/user.controller'
import { CreateUserUseCase } from './use-cases/create-user-use-case'
import { DatabaseModule } from '@/app/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
