import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import type { ProductSchema } from '../schemas/product.schema'
import type { ProductRepository } from './product-repository'
import { Inject, Injectable } from '@nestjs/common'
import { productsTable } from '@/app/database/drizzle/schema'
import { and, eq } from 'drizzle-orm'

@Injectable()
export class DrizzleProductRepository implements ProductRepository {
  constructor(
    @Inject(DatabaseProvider)
    private readonly database: DatabaseProvider
  ) {}

  async create(data: ProductSchema): Promise<ProductSchema> {
    const [product] = await this.database
      .getDatabase()
      .insert(productsTable)
      .values({
        name: data.name,
        ean: data.ean,
        description: data.description,
        customerId: data.customerId,
      })
      .returning()

    return product
  }

  async findById(id: string): Promise<ProductSchema> {
    const [product] = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))

    return product
  }

  async findByName(
    name: string,
    customerId: string
  ): Promise<ProductSchema | null> {
    const [product] = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.name, name),
          eq(productsTable.customerId, customerId)
        )
      )

    return product
  }

  async findByEan(
    eanCode: string,
    customerId: string
  ): Promise<ProductSchema | null> {
    const [product] = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.ean, eanCode),
          eq(productsTable.customerId, customerId)
        )
      )

    return product
  }

  async findAll(customerId: string): Promise<ProductSchema[]> {
    const products = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(eq(productsTable.customerId, customerId))

    return products
  }

  async update(id: string, data: Partial<ProductSchema>): Promise<void> {
    await this.database
      .getDatabase()
      .update(productsTable)
      .set(data)
      .where(eq(productsTable.id, id))
  }

  async delete(id: string): Promise<void> {
    await this.database
      .getDatabase()
      .delete(productsTable)
      .where(eq(productsTable.id, id))
  }
}
