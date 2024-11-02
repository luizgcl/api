import { Command, CommandRunner } from 'nest-commander'
import { DatabaseProvider } from 'src/app/database/drizzle/database.provider'
import { usersTable } from 'src/app/database/drizzle/schema'
import * as bcrypt from 'bcrypt'
import { Inject } from '@nestjs/common'

@Command({
  name: 'seed',
  description: 'Seed the database',
})
export class SeedCommand extends CommandRunner {
  constructor(
    @Inject(DatabaseProvider) private readonly database: DatabaseProvider
  ) {
    super()
  }

  async run(): Promise<void> {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt)

    const userData = {
      name: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      passwordHash,
    }

    await this.database.getDatabase().insert(usersTable).values(userData)
  }
}
