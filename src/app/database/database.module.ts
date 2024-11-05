import { Module } from '@nestjs/common'
import { DatabaseProvider } from './drizzle/database.provider'
import { RedisProvider } from './redis/redis.provider'

@Module({
  providers: [DatabaseProvider, RedisProvider],
  exports: [DatabaseProvider, RedisProvider],
})
export class DatabaseModule {}
