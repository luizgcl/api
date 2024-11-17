import { DatabaseModule } from '@/app/database/database.module'
import { Module } from '@nestjs/common'
import { ProductRepository } from './repositories/product-repository'
import { DrizzleProductRepository } from './repositories/drizzle-product-repository'
import { ProductController } from './controllers/product.controller'
import { CreateProductUseCase } from './use-cases/create-product-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: DrizzleProductRepository,
    },
    CreateProductUseCase,
  ],
})
export class ProductsModule {}
