import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import type { UserResponse } from '../../users/io/user-response'
import { JwtService } from '@nestjs/jwt'
import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../../users/repositories/user-repository'

@Injectable()
export class GetUserByTokenUseCase implements IUseCase<string, UserResponse> {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle(data: string): Promise<UserResponse> {
    const decodedToken = this.jwtService.decode(data.substring(7))

    const user = await this.userRepository.findByEmail(decodedToken.sub)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      customerId: user.customerId,
      createdAt: user.createdAt,
    }
  }
}
