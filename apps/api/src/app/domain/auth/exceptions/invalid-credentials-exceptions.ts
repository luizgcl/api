import { Exception } from '@/app/core/exceptions/base-exception'
import { HttpStatus } from '@nestjs/common'

export class InvalidCredentialsException extends Exception {
  constructor() {
    super('INVALID_CREDENTIALS', 'Invalid Credentials', HttpStatus.UNAUTHORIZED)
  }
}
