import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import type { ProductSchema } from '../schemas/product.schema'
import type { ProductRepository } from './product-repository'
import { Inject, Injectable } from '@nestjs/common'
import { productsTable } from '@/app/database/drizzle/schema'
import { eq } from 'drizzle-orm'

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

  async findByName(name: string): Promise<ProductSchema | null> {
    const [product] = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(eq(productsTable.name, name))

    return product
  }

  async findByEan(eanCode: string): Promise<ProductSchema | null> {
    const [product] = await this.database
      .getDatabase()
      .select()
      .from(productsTable)
      .where(eq(productsTable.ean, eanCode))

    return product
  }

  async findAll(): Promise<ProductSchema[]> {
    const products = await this.database
      .getDatabase()
      .select()
      .from(productsTable)

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
