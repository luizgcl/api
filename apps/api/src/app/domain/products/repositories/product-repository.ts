import type { ProductSchema } from '../schemas/product.schema'
import { Injectable } from '@nestjs/common'
import type { AggregateRepository } from '@/app/database/repositories/aggregate-repository'

@Injectable()
export abstract class ProductRepository
  implements AggregateRepository<string, ProductSchema>
{
  abstract create(data: ProductSchema): Promise<ProductSchema>
  abstract findById(id: string): Promise<ProductSchema>
  abstract findByName(
    name: string,
    customerId: string
  ): Promise<ProductSchema | null>
  abstract findByEan(
    eanCode: string,
    customerId: string
  ): Promise<ProductSchema | null>
  abstract findAll(customerId: string): Promise<ProductSchema[]>
  abstract update(id: string, data: Partial<ProductSchema>): Promise<void>
  abstract delete(id: string): Promise<void>
}
