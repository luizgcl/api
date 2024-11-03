import { Module } from '@nestjs/common'
import { SeedCommand } from './list/seed-command'
import { DatabaseModule } from 'src/app/database/database.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [SeedCommand],
})
export class CommandModule {}
