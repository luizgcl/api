import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import { UserRepository } from '@/app/domain/users/repositories/user-repository'
import { JwtService } from '@nestjs/jwt'
import { Inject } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { InvalidCredentialsException } from '@/app/domain/auth/exceptions/invalid-credentials-exceptions'

export type AuthenticateUserParams = {
  email: string
  password: string
}

export type AuthenticateUserResponse = {
  authorizationToken: string
}

export class AuthenticateUserUseCase
  implements IUseCase<AuthenticateUserParams, AuthenticateUserResponse>
{
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle({
    email,
    password,
  }: AuthenticateUserParams): Promise<AuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsException()
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      throw new InvalidCredentialsException()
    }

    const payload = {
      username: user.email,
    }

    const FIVE_SECONDS = 5 * 60

    const authorizationToken = this.jwtService.sign(payload, {
      expiresIn: FIVE_SECONDS,
      subject: user.email,
    })

    return {
      authorizationToken,
    }
  }
}
