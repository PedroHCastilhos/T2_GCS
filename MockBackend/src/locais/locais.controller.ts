import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { SignupLocal } from "./DTOs/locais";
import { LocaisService } from "./locais.service";
import { UserGuard } from "src/user/user.guard";
import { NivelAcesso } from "src/user/nivel-acesso.decorator";

@Controller() 
export class LocaisController {
    constructor(private locaisService: LocaisService) {}

    @UseGuards(UserGuard)
    @Post('room')
    async signup(@Body() req: SignupLocal) {
        return await this.locaisService.signup(req)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(5)
    @Put('room/:id')
    async modifyRoom(@Body() req: SignupLocal, @Param('id') id : number) {
        return await this.locaisService.modifyRoom(req, id)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(1)
    @Get('rooms')
    async listAll() {
        return await this.locaisService.listAll()
    }

    @UseGuards(UserGuard)
    @NivelAcesso(1)
    @Get('room/:id')
    async searchById(@Param('id') id : number) {
        return await this.locaisService.searchById(id)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(5)
    @Patch('room/:id')
    async isBlocked(@Param('id') id : number) {
        return await this.locaisService.isBlocked(id)
    }
}