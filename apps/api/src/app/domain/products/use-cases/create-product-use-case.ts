import type { IUseCase } from '@/app/core/use-cases/generic-use-case'
import type { ProductRequest } from '../io/product-request'
import type { ProductResponse } from '../io/product-response'
import { ProductRepository } from '../repositories/product-repository'
import { Inject } from '@nestjs/common'
import { ProductAlreadyExistsException } from '../exceptions/product-already-exists-exception'

export class CreateProductUseCase
  implements IUseCase<ProductRequest, ProductResponse>
{
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async handle(data: ProductRequest): Promise<ProductResponse> {
    const productWithSameCode = await this.productRepository.findByEan(data.ean)

    if (productWithSameCode) {
      throw new ProductAlreadyExistsException()
    }

    const product = await this.productRepository.create(data)

    return {
      id: product.id,
      name: product.name,
      ean: product.ean,
      description: product.description,
      customerId: product.customerId,
      createdAt: product.createdAt,
    }
  }
}
