import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'

@Injectable()
export class DatabaseProvider {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  getDatabase() {
    return drizzle(this.configService.get('DATABASE_URL'))
  }
}
