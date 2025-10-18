import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SigninDTO, SignupDTO } from './DTOs/user';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import {JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}
    async signup(req: SignupDTO) {
        if(req.level < 1 || req.level > 5) {
            throw new UnauthorizedException('Nivel de acesso invalido')
        }
        
        const existeUsuario = await this.prismaService.user.findUnique({
            where: {
                email: req.email
            }
        })

        if(existeUsuario) {
            throw new UnauthorizedException('Usuario ja existe')
        }

        const hashedPassword = await bcrypt.hash(req.password, 10)

        const user = await this.prismaService.user.create({ 
            data: {
                ...req,
                password: hashedPassword
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            level: user.level
        }
    }

    async signin(req: SigninDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: req.email
            }
        })

        if(!user) {
            throw new UnauthorizedException("Credenciais invalidas")
        }

        const senhaValida = await bcrypt.compare(req.password, user.password)

        if(!senhaValida) {
            throw new UnauthorizedException("Credenciais invalidas")
        }

        const token = await this.jwtService.signAsync({
            id: user.id,
            name: user.name,
            email: user.email,
            level: user.level,
            profile_image: user.profile_image
        })
        
        return {
            token,
        }
    }

    async listAll() {
        const users = await this.prismaService.user.findMany() 
        return users
    }

    async searchById(id : number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id : id
            }
        })

        if(user == null) {
            throw new NotFoundException('Usuario nao encontrado')
        }
        
        return user
    }

    async updateUser(req, id : number) {
        const hashedPassword = await bcrypt.hash(req.password, 10)

        if(req.level < 1 || req.level > 5) {
            throw new UnauthorizedException('Nivel de acesso invalido')
        }

        const user = await this.prismaService.user.update({
            where: {
                id : id
            },
            data : {
                ...req,
                password: hashedPassword
            }
        })

        if(user == null) {
            throw new NotFoundException('Usuario nao encontrado')
        }
        
        return user
    }

    async deleteUser(req, id : number) {
        const user = this.prismaService.user.delete({
            where: {
                id : id
            }
        })

        if(user == null) {
            throw new NotFoundException('Usuario nao encontrado')
        }

        return user
    }

    async updateLevel(id : number, level : number) {
        if(level < 1 || level > 5) {
            throw new UnauthorizedException('Nivel de acesso invalido')
        }

        const user = this.prismaService.user.update({
            where : {
                id : id
            },
            data : {
                level : level
            }
        })

        if(user == null) {
            throw new NotFoundException('Usuario nao encontrado')
        }

        return user
    }
}
