import { Module } from '@nestjs/common'
import { SeedCommand } from './list/seed-command'

import { ConfigModule } from '@nestjs/config'
import { DropDatabaseCommand } from './list/drop-database'
import { DatabaseModule } from '@/app/database/database.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [SeedCommand, DropDatabaseCommand],
})
export class CommandModule {}
