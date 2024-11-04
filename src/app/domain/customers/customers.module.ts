import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/app/database/database.module'

@Module({
  imports: [DatabaseModule],
})
export class CustomersModule {}
