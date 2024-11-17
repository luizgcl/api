import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common'
import { CreateCustomerUseCase } from '@/app/domain/customers/use-cases/create-customer-use-case'
import {
  customerRequestSchema,
  type CustomerRequest,
} from '@/app/domain/customers/io/customer-request'
import type { CustomerResponse } from '@/app/domain/customers/io/customer-response'
import { ZodValidationPipe } from '@/app/core/pipes/zod-validation.pipe'

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject(CreateCustomerUseCase)
    private readonly createCustomerUseCase: CreateCustomerUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(customerRequestSchema))
  async create(
    @Body() customerRequest: CustomerRequest
  ): Promise<CustomerResponse> {
    return await this.createCustomerUseCase.handle(customerRequest)
  }
}
