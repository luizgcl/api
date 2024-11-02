import { HttpStatus } from '@nestjs/common'
import { Exception } from 'src/app/core/exceptions/base-exception'

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super('USER_ALREADY_EXISTS', 'User already exists')
  }
}
