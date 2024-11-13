import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { JwtGuard } from '@/app/domain/auth/guards/jwt.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const reflector = app.get(Reflector)

  app.useGlobalGuards(new JwtGuard(reflector))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
