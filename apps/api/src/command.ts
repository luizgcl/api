import { CommandFactory } from 'nest-commander'
import { CommandModule } from './command/command.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  await CommandFactory.run(CommandModule, new Logger())
}

bootstrap()
