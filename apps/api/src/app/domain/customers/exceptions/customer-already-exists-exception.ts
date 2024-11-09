import { Exception } from '@/app/core/exceptions/base-exception'
import { HttpStatus } from '@nestjs/common'

export class CustomerAlreadyExistsException extends Exception {
  constructor() {
    super('CUSTOMER_ALREADY_EXISTS', 'Customer already exists')
  }
}
