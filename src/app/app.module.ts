import { Module } from '@nestjs/common'
import { UsersModule } from './domain/users/users.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './domain/customers/customers.module';

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
