import { Body, Controller, Post } from '@nestjs/common'
import type { CreateUserUseCase } from '../use-cases/create-user-use-case';
import type { UserRequest } from '../io/user-request';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    @Post()
    async createUser(@Body() userRequest: UserRequest) {
        await this.createUserUseCase.handle(userRequest);
    }
}
