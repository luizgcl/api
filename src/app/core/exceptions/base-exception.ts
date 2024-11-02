import { HttpStatus } from '@nestjs/common'

export abstract class Exception extends Error {
  constructor(
    private readonly _code: string,
    message: string,
    private readonly status: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message)
  }

  get code(): string {
    return this._code
  }
}
