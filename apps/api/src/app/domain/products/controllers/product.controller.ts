import { Body, Controller, Inject, Post, UsePipes } from '@nestjs/common'
import { CreateProductUseCase } from '../use-cases/create-product-use-case'
import {
  productRequestSchema,
  type ProductRequest,
} from '../io/product-request'
import { ZodValidationPipe } from '@/app/core/pipes/zod-validation.pipe'

@Controller('/products')
export class ProductController {
  constructor(
    @Inject(CreateProductUseCase)
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(productRequestSchema))
  async create(@Body() createProductParams: ProductRequest) {
    return await this.createProductUseCase.handle(createProductParams)
  }
}
