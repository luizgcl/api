import { Module } from '@nestjs/common'
import { SeedCommand } from './list/seed-command'
import { DatabaseModule } from 'src/app/database/database.module'
import { ConfigModule } from '@nestjs/config'
import { DropDatabaseCommand } from './list/drop-database'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  providers: [SeedCommand, DropDatabaseCommand],
})
export class CommandModule {}
