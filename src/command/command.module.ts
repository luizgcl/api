import { Module } from '@nestjs/common'
import { SeedCommand } from './list/seed-command'
import { DatabaseModule } from 'src/app/database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [SeedCommand],
})
export class CommandModule {}
