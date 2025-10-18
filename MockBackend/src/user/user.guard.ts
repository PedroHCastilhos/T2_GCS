import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Reflector } from "@nestjs/core";
import { NIVEL_ACESSO_KEY } from "./nivel-acesso.decorator";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService : JwtService, private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const nivelRequerido = this.reflector.getAllAndOverride<number>(
            NIVEL_ACESSO_KEY,
            [context.getHandler(), context.getClass()]
        )
        const req = context.switchToHttp().getRequest()
        const token = this.extrairToken(req)

        if(!nivelRequerido) {
            return true
        }

        if(!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            })

            req['user'] = payload

        } catch {
            throw new UnauthorizedException()
        }

        if(!req) {
            throw new ForbiddenException('Usuario nao autenticado')
        }

        if(req.user.level < nivelRequerido) {
            throw new ForbiddenException('Acesso negado: nivel abaixo')
        }

        return true
    }

    private extrairToken(req: Request): string | undefined{
        const [type, token] = req.headers['authorization']?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}