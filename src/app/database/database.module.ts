import { Module } from '@nestjs/common'
import { DatabaseProvider } from './drizzle/database.provider'

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
