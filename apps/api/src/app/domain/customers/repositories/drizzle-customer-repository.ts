import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import { customersTable, usersTable } from '@/app/database/drizzle/schema'
import { Inject, Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import type { CustomerRepository } from './customer-repository'
import type { CustomerSchema } from '../schemas/customer-schema'

@Injectable()
export class DrizzleCustomerRepository implements CustomerRepository {
  constructor(
    @Inject(DatabaseProvider)
    private readonly database: DatabaseProvider
  ) {}

  async create(data: CustomerSchema): Promise<CustomerSchema> {
    const [customer] = await this.database
      .getDatabase()
      .insert(customersTable)
      .values({
        name: data.name,
        socialName: data.socialName,
        document: data.document,
        email: data.email,
      })
      .returning()

    return customer
  }

  async findById(id: string): Promise<CustomerSchema> {
    const [customer] = await this.database
      .getDatabase()
      .select()
      .from(customersTable)
      .where(eq(customersTable.id, id))

    return customer
  }

  async findByEmail(email: string): Promise<CustomerSchema | null> {
    const [customer] = await this.database
      .getDatabase()
      .select()
      .from(customersTable)
      .where(eq(customersTable.email, email))

    return customer
  }

  async findAll(): Promise<CustomerSchema[]> {
    return this.database.getDatabase().select().from(customersTable)
  }

  async update(id: string, data: Partial<CustomerSchema>): Promise<void> {
    await this.database
      .getDatabase()
      .update(customersTable)
      .set(data)
      .where(eq(customersTable.id, id))
  }

  async delete(id: string): Promise<void> {
    await this.database
      .getDatabase()
      .delete(customersTable)
      .where(eq(usersTable.id, id))
  }
}
