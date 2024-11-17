import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common'
import {
  type AuthenticateUserParams,
  type AuthenticateUserResponse,
  AuthenticateUserUseCase,
} from '@/app/domain/auth/use-cases/AuthenticateUserUseCase'
import { Public } from '@/app/domain/auth/decorators/public.decorator'
import { GetUserByTokenUseCase } from '../use-cases/GetUserByTokenUseCase'
import type { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthenticateUserUseCase)
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    @Inject(GetUserByTokenUseCase)
    private readonly getUserByTokenUseCase: GetUserByTokenUseCase
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body() authenticateRequest: AuthenticateUserParams
  ): Promise<AuthenticateUserResponse> {
    return await this.authenticateUserUseCase.handle(authenticateRequest)
  }

  @Get('me')
  async about(@Req() request: Request) {
    return await this.getUserByTokenUseCase.handle(
      request.headers.authorization
    )
  }
}
