import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LeaderboardService {

	constructor(private prismaService: PrismaService) { }

	getUsersByRating() {
		return this.prismaService.user.findMany({
			orderBy: {
				rating: 'desc'
			}
		});
	};

	getUsersByWins() {
		return this.prismaService.user.findMany({
			orderBy: {
				wins: 'desc'
			}
		});
	}

	getUsersByXp() {
		return this.prismaService.user.findMany({
			orderBy: {
				xp: 'desc'
			}
		});
	}
}