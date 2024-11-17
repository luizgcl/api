import {
  type PipeTransform,
  type ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common'
import type { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (error) {
      throw new BadRequestException('Validation failed')
    }
  }
}