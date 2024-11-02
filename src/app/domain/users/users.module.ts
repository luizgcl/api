import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/app/database/database.module'
import { UserController } from './controllers/user.controller'
import { CreateUserUseCase } from './use-cases/create-user-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
