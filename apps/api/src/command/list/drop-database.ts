import { Command, CommandRunner } from 'nest-commander'
import { Inject, Logger } from '@nestjs/common'
import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import { customersTable, usersTable } from '@/app/database/drizzle/schema'

@Command({
  name: 'drop-db',
  description: 'Drop the database',
})
export class DropDatabaseCommand extends CommandRunner {
  constructor(
    @Inject(DatabaseProvider) private readonly database: DatabaseProvider,
    private readonly logger: Logger
  ) {
    super()

    this.logger = new Logger(DropDatabaseCommand.name)
  }

  async run(): Promise<void> {
    const start = new Date()
    this.logger.log('Deletando os dados do banco de dados...')

    try {
      this.database.getDatabase().delete(customersTable)
      this.database.getDatabase().delete(usersTable)
    } catch (e) {
      this.logger.error(
        'Ocorreu um erro ao deletar os dados do banco de dados:'
      )
      this.logger.error(e.message)
    } finally {
      const timeInMs = new Date().getTime() - start.getTime()
      this.logger.log(`Operação concluída! (${timeInMs}ms)`)
    }
  }
}
