import { DatabaseModule } from '@/app/database/database.module'
import { Module } from '@nestjs/common'
import { CustomerController } from './controllers/customer.controller'
import { CustomerRepository } from '@/app/domain/customers/repositories/customer-repository'
import { DrizzleCustomerRepository } from '@/app/domain/customers/repositories/drizzle-customer-repository'
import { CreateCustomerUseCase } from '@/app/domain/customers/use-cases/create-customer-use-case'

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: CustomerRepository,
      useClass: DrizzleCustomerRepository,
    },
    CreateCustomerUseCase,
  ],
})
export class CustomersModule {}
