import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

	constructor(private prisma: PrismaService){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET
		});
	}

	async validate(payload: {intraId: number, intraToken: string}){
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: payload.intraId,
			},
		});	
		return user;
	}
}