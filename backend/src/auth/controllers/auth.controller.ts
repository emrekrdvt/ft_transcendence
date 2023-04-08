import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: AuthService) {}



    @Get('user')
    async login(@Query('code') code:string) {
        return await this.userService.login(code);
    }
}
