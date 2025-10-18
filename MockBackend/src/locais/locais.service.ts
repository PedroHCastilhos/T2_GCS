import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { SignupLocal } from "./DTOs/locais";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LocaisService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}
    async signup(req: SignupLocal) {
        if(req.acessLevel < 1 || req.acessLevel > 5) {
            throw new UnauthorizedException('Nivel de acesso invalido')
        }

        const local = await this.prismaService.local.create({ data: req })
        return local
    }

    async modifyRoom(req: SignupLocal, id : number) {
        if(req.acessLevel < 1 || req.acessLevel > 5) {
            throw new UnauthorizedException('Nivel de acesso invalido')
        }
        
        const local = await this.prismaService.local.update({
            where: {
                id : id
            },
            data: req
        })

        if(local == null) {
            throw new NotFoundException('Local nao encontrado')
        }

        return local
    }

    async listAll() {
        const locais = await this.prismaService.local.findMany()
        return locais
    }

    async searchById(id : number) {
        const local = await this.prismaService.local.findUnique({
            where: {
                id : id
            }
        })

        if(local == null) {
           throw new NotFoundException('Local nao encontrado')
        }

        return local
    }

    async isBlocked(id : number) {
        const local = await this.prismaService.local.findUnique({
            where : {
                id : id
            }
        })

        if(local == null) {
            throw new NotFoundException('Local nao encontrado')
        }

        const bloqueio = !local?.isBlocked

        const localAtualizado = await this.prismaService.local.update({
            where : {
                id : id
            },
            data : {
                isBlocked : bloqueio
            }
        })
        
        return localAtualizado
    }
}