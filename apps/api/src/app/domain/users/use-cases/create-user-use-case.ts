import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import { UserRepository } from '@/app/domain/users/repositories/user-repository'
import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserAlreadyExistsException } from '../exceptions/user-already-exists-exception'
import type { UserRequest } from '../io/user-request'
import type { UserResponse } from '../io/user-response'

@Injectable()
export class CreateUserUseCase implements IUseCase<UserRequest, UserResponse> {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async handle({
    email,
    name,
    password,
    customerId,
  }: UserRequest): Promise<UserResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsException()
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await this.userRepository.create({
      email,
      name,
      passwordHash,
      customerId,
    })

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      customerId: user.customerId,
      createdAt: user.createdAt,
    }
  }
}
