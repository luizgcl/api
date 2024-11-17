import type { Repository } from '@/app/database/repositories/repository'
import type { ProductSchema } from '../schemas/product.schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class ProductRepository
  implements Repository<string, ProductSchema>
{
  abstract create(data: ProductSchema): Promise<ProductSchema>
  abstract findById(id: string): Promise<ProductSchema>
  abstract findByName(name: string): Promise<ProductSchema | null>
  abstract findByEan(eanCode: string): Promise<ProductSchema | null>
  abstract findAll(): Promise<ProductSchema[]>
  abstract update(id: string, data: Partial<ProductSchema>): Promise<void>
  abstract delete(id: string): Promise<void>
}
