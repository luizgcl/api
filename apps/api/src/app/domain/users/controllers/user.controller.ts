import { Body, Controller, Inject, Post } from '@nestjs/common'
import { CreateUserUseCase } from '../use-cases/create-user-use-case'
import type { UserRequest } from '../io/user-request'

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  async createUser(@Body() userRequest: UserRequest) {
    await this.createUserUseCase.handle(userRequest)
  }
}
