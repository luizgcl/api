import { AuthGuard } from '@nestjs/passport'
import { type ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '@/app/domain/auth/decorators/public.decorator'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    return super.canActivate(context)
  }
}
