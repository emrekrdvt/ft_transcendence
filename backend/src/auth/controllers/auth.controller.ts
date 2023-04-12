import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: AuthService) {}



    @Get('user')
    async login(@Query('code') code:string) {
        return await this.userService.login(code);
    }

	@Post('register')
	async register(@Body() req: any) {
		return await this.userService.register(req.intraId);
	}
}
