import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly us: UserService) {}
    
    // Query('code') code: string
    // /users?code=1234 şeklinde bir istek gönderir code değişkeninin 
    // içine 1234 değerini atar
    @Get('auth')
    async login(@Query('code') code:string) {
        //console.log(code);
        return await this.us.login(code);
    }

    

    // @Post('code')
    // async getCode(@Query('code') code: string) {
    //     console.log(code);
    //     return await code;
    // }
    
    @Get('getusers/:id')
    async getUsers(@Param('id') id) {
        return await this.us.getUsers(Number(id));
    }
    

}
