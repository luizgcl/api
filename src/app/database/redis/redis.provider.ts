import { Inject, Injectable, type OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, type RedisClientType } from 'redis'

@Injectable()
export class RedisProvider implements OnModuleInit {
  private connection: RedisClientType

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    this.connection = createClient({
      url: this.configService.get('REDIS_URL'),
    })
  }

  async openConnection() {
    return await this.connection.connect()
  }

  async closeConnection(conn: RedisClientType) {
    return await conn.disconnect()
  }
}
