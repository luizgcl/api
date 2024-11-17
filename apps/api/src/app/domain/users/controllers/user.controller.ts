import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common'
import { CreateUserUseCase } from '../use-cases/create-user-use-case'
import { userRequestSchema, type UserRequest } from '../io/user-request'
import { ZodValidationPipe } from '@/app/core/pipes/zod-validation.pipe'

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(userRequestSchema))
  async createUser(@Body() userRequest: UserRequest) {
    await this.createUserUseCase.handle(userRequest)
  }
}
