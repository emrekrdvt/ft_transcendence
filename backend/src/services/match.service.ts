import { Injectable } from "@nestjs/common";
import { Match } from 'prisma/prisma-client';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MatchService
{
	constructor(private prisma: PrismaService){}
	
	getLastMatch = async (intraId: number) => {
		const matches = await this.prisma.match.findMany({
			where: {
				userId: intraId,
			},
		});
		return matches[matches.length - 1];
	};

	getMatches = async (intraId: number) => {
		return await this.prisma.match.findMany({
			where: {
				userId: intraId,
			},
		});
	}
}