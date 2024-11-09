import { Exception } from '@/app/core/exceptions/base-exception'
import { HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super('USER_ALREADY_EXISTS', 'User already exists')
  }
}
