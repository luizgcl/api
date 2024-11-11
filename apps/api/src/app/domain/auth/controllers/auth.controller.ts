import { Body, Controller, Inject, Post } from '@nestjs/common'
import {
  type AuthenticateUserParams,
  type AuthenticateUserResponse,
  AuthenticateUserUseCase,
} from '@/app/domain/auth/use-cases/AuthenticateUserUseCase'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthenticateUserUseCase)
    private readonly authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  @Post('login')
  async login(
    @Body() authenticateRequest: AuthenticateUserParams
  ): Promise<AuthenticateUserResponse> {
    return await this.authenticateUserUseCase.handle(authenticateRequest)
  }
}
