import { Injectable } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'

@Injectable()
export class DatabaseProvider {
  constructor(private configService: ConfigService) {}

  getDatabase() {
    return drizzle(this.configService.get('DATABASE_URL'))
  }
}
