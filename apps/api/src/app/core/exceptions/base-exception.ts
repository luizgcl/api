import { HttpException, HttpStatus } from '@nestjs/common'

export abstract class Exception extends HttpException {
  protected constructor(
    code: string,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super({ code, message }, status)
  }
}
