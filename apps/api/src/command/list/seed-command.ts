import { Command, CommandRunner } from 'nest-commander'
import * as bcrypt from 'bcrypt'
import { Inject, Logger } from '@nestjs/common'
import { DatabaseProvider } from '@/app/database/drizzle/database.provider'
import { customersTable, usersTable } from '@/app/database/drizzle/schema'

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
      const customerData = {
        name: process.env.COMPANY_NAME,
        socialName: process.env.COMPANY_SOCIAL_NAME,
        email: process.env.COMPANY_EMAIL,
        document: process.env.COMPANY_DOCUMENT,
        documentType: process.env.COMPANY_DOCUMENT_TYPE,
      }

      this.logger.log('Gerando empresa...')
      const [customer] = await this.database
        .getDatabase()
        .insert(customersTable)
        .values(customerData)
        .returning()
      this.logger.log('Empresa cadastrada com sucesso!')

      this.logger.log('Gerando usuário...')
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(
        process.env.COMPANY_USER_PASSWORD,
        salt
      )

      const userData = {
        name: process.env.COMPANY_USER_USERNAME,
        email: process.env.COMPANY_USER_EMAIL,
        customerId: customer.id,
        passwordHash,
      }

      await this.database.getDatabase().insert(usersTable).values(userData)
      this.logger.log('Usuário cadastrado com sucesso!')
    } catch (e) {
      this.logger.error('Ocorreu um erro ao popular o banco de dados:')
      this.logger.error(e.message)
    } finally {
      const timeInMs = new Date().getTime() - start.getTime()
      this.logger.log(`Operação finalizada. (${timeInMs}ms)`)
    }
  }
}
