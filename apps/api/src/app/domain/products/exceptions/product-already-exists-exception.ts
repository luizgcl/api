import { Exception } from '@/app/core/exceptions/base-exception'

export class ProductAlreadyExistsException extends Exception {
  constructor() {
    super('PRODUCT_ALREADY_EXISTS', 'Product already exists')
  }
}
