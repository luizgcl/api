import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { CustomersModule } from './domain/customers/customers.module'
import { UsersModule } from './domain/users/users.module'
import { AuthModule } from '@/app/domain/auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule {}
