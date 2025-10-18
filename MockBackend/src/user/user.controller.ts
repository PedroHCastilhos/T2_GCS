import { Body, Controller, Post, Get, Patch, Delete, ParseArrayPipe, Param, UseGuards } from '@nestjs/common';
import { SignupDTO, SigninDTO} from './DTOs/user';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { NivelAcesso } from './nivel-acesso.decorator';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}
    
    @Post('users')
    async signup(@Body() req: SignupDTO) {
        return await this.userService.signup(req)
    }

    @Post('auth/login')
    async signin(@Body() req: SigninDTO) {
        return await this.userService.signin(req)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(1)
    @Get('users')
    async listAll() {
        return await this.userService.listAll()
    }

    @UseGuards(UserGuard)
    @NivelAcesso(1)
    @Get('users/:id')
    async searchById(@Param('id') id : number) {
        return await this.userService.searchById(id)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(5)
    @Patch('users/:id')
    async updateUser(@Body() req , @Param('id') id : number) {
        return await this.userService.updateUser(req, id)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(4)
    @Delete('users/:id')
    async deleteUser(@Body() req, @Param('id') id : number) {
        return this.userService.deleteUser(req, id)
    }

    @UseGuards(UserGuard)
    @NivelAcesso(5)
    @Patch('users/:id/:level')
    async updateLevel(@Param('id') id : number, @Param('level') level : number) {
        return this.userService.updateLevel(id, level)
    }
}
