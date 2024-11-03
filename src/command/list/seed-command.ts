import { Command, CommandRunner } from 'nest-commander'
import { DatabaseProvider } from 'src/app/database/drizzle/database.provider'
import { usersTable } from 'src/app/database/drizzle/schema'
import * as bcrypt from 'bcrypt'
import { Inject, Logger, LoggerService } from '@nestjs/common'

@Command({
  name: 'seed',
  description: 'Seed the database',
})
export class SeedCommand extends CommandRunner {
  constructor(
    @Inject(DatabaseProvider) private readonly database: DatabaseProvider,
    private readonly logger: Logger
  ) {
    super()

    this.logger = new Logger(SeedCommand.name)
  }

  async run(): Promise<void> {
    const start = new Date()
    this.logger.log('Populando o banco de dados...')

    try {
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)

      const userData = {
        name: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        passwordHash,
      }

      await this.database.getDatabase().insert(usersTable).values(userData)
    } catch (e) {
      this.logger.error('Ocorreu um erro ao popular o banco de dados:')
      this.logger.error(e.message)
    } finally {
      const timeInMs = new Date().getTime() - start.getTime()
      this.logger.log(`Operação concluída! (${timeInMs}ms)`)
    }
  }
}
