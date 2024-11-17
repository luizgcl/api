import { Body, Controller, Inject, Post } from '@nestjs/common'
import { CreateProductUseCase } from '../use-cases/create-product-use-case'
import type { ProductRequest } from '../io/product-request'

@Controller('/products')
export class ProductController {
  constructor(
    @Inject(CreateProductUseCase)
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  @Post()
  async create(@Body() createProductParams: ProductRequest) {
    return await this.createProductUseCase.handle(createProductParams)
  }
}
