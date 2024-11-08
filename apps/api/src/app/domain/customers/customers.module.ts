import { DatabaseModule } from '@/app/database/database.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
})
export class CustomersModule {}
