import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AchievementService {

	constructor(private prismaService: PrismaService){}

	async createAchievement(name: string, progressMax: number, description: string, url: string) {
		const users = await this.prismaService.user.findMany();
		for (const user of users) {
			await this.prismaService.achievement.create({
				data: {
					name: name,
					progressMax: progressMax,
					description: description,
					url: url,
					user: {
						connect: {
							intraId: user.intraId,
						}
					}
				}
			});
		}
	};

	async addDefaultAchievements(intraId: number) {
		const fileContent = await fs.promises.readFile('src/assets/achievements.json', 'utf-8');
		const achievements = JSON.parse(fileContent);
		for (const achievement of achievements) {
			await this.prismaService.achievement.create({
				data: {
					name: achievement.name,
					progressMax: achievement.progressMax,
					description: achievement.description,
					url: achievement.url,
					user: {
						connect: {
							intraId: intraId,
						}
					}
				}
			});
		}
	};

	async getAchievements(intraId: number) {
		return await this.prismaService.achievement.findMany({
			where: {
				userId: intraId,
			},
		});
	}

}