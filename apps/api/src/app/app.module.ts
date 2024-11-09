import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { CustomersModule } from './domain/customers/customers.module'
import { UsersModule } from './domain/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule {}
