import { DatabaseModule } from '@/app/database/database.module'
import { Module } from '@nestjs/common'
import { CustomerController } from './controllers/customer.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
})
export class CustomersModule {}
