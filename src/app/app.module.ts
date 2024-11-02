import { Module } from '@nestjs/common'
import { UsersModule } from './domain/users/users.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule],
})
export class AppModule {}
