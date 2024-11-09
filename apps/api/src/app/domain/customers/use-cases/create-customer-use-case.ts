import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import type { CustomerRequest } from '../io/customer-request'
import type { CustomerResponse } from '../io/customer-response'
import { Inject, Injectable } from '@nestjs/common'
import type { IUseCase } from '@/app/core/use-cases/generic-use-case'

@Injectable()
export class CreateCustomerUseCase
  implements IUseCase<CustomerRequest, CustomerResponse>
{
  constructor(
    @Inject(DatabaseProvider)
    private readonly database: DatabaseProvider
  ) {}

  async handle(data: CustomerRequest): Promise<CustomerResponse> {
    return {}
  }
}
