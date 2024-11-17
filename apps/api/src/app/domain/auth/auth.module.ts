import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthController } from '@/app/domain/auth/controllers/auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthenticateUserUseCase } from '@/app/domain/auth/use-cases/AuthenticateUserUseCase'
import { JwtStrategy } from '@/app/domain/auth/strategies/jwt.strategy'
import { UserRepository } from '@/app/domain/users/repositories/user-repository'
import { DrizzleUserRepository } from '@/app/domain/users/repositories/drizzle-user-repository'
import { DatabaseModule } from '@/app/database/database.module'
import { GetUserByTokenUseCase } from './use-cases/GetUserByTokenUseCase'

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    AuthenticateUserUseCase,
    GetUserByTokenUseCase,
  ],
})
export class AuthModule {}
