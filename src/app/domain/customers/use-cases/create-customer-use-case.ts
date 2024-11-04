import type { IUseCase } from 'src/app/core/use-cases/generic-use-case'
import type { CustomerRequest } from '../io/customer-request'
import type { CustomerResponse } from '../io/customer-response'
import { Inject, Injectable } from '@nestjs/common'
import { DatabaseProvider } from 'src/app/database/drizzle/database.provider'

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
