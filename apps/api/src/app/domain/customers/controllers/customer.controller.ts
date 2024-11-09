import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateCustomerUseCase } from "@/app/domain/customers/use-cases/create-customer-use-case";
import type { CustomerRequest } from "@/app/domain/customers/io/customer-request";
import type { CustomerResponse } from "@/app/domain/customers/io/customer-response";

@Controller('customers')
export class CustomerController {

  constructor(
    @Inject(CreateCustomerUseCase)
    private readonly createCustomerUseCase: CreateCustomerUseCase) {
  }

  @Post()
  async create(@Body() customerRequest: CustomerRequest): Promise<CustomerResponse> {
    return await this.createCustomerUseCase.handle(customerRequest);
  }
}
