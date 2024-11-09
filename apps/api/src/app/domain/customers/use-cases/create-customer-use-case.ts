import type { CustomerRequest } from '../io/customer-request'
import type { CustomerResponse } from '../io/customer-response'
import { Inject, Injectable } from '@nestjs/common'
import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import { CustomerRepository } from '../repositories/customer-repository'
import { CustomerAlreadyExistsException } from "@/app/domain/customers/exceptions/customer-already-exists-exception";

@Injectable()
export class CreateCustomerUseCase
  implements IUseCase<CustomerRequest, CustomerResponse>
{
  constructor(
    @Inject(CustomerRepository)
    private customerRepository: CustomerRepository
  ) {}

  async handle({
    email,
    name,
    socialName,
    document,
    documentType,
  }: CustomerRequest): Promise<CustomerResponse> {
    const customerWithSameEmail =
      await this.customerRepository.findByEmail(email)

    if (customerWithSameEmail) {
      throw new CustomerAlreadyExistsException()
    }

    const customer = await this.customerRepository.create({
      name,
      socialName,
      document,
      documentType,
      email
    })

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      socialName: customer.socialName,
      document: customer.document,
      documentType: customer.documentType,
      createdAt: customer.createdAt
    }
  }
}
