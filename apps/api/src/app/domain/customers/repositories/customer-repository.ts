import type { Repository } from '@/app/database/repositories/repository'
import type { CustomerSchema } from '../schemas/customer-schema'

export abstract class CustomerRepository
  implements Repository<string, CustomerSchema>
{
  abstract create(data: CustomerSchema): Promise<CustomerSchema>
  abstract findById(id: string): Promise<CustomerSchema>
  abstract findByEmail(email: string): Promise<CustomerSchema | null>
  abstract findAll(): Promise<CustomerSchema[]>
  abstract update(id: string, data: Partial<CustomerSchema>): Promise<void>
  abstract delete(id: string): Promise<void>
}
