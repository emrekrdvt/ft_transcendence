import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../guard/jwt.guard';

@Controller('users')
export class UserController {
	@UseGuards(JwtGuard)
	@Get('me')
	getMe(@Req() req: Request){
		return req.user;
	}
}
