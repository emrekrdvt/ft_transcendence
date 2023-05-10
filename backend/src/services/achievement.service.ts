import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Match } from "@prisma/client";
import * as fs from 'fs';
import { PrismaService } from "src/prisma/prisma.service";
import { MatchService } from "./match.service";


@Injectable()
export class AchievementService {

	constructor(private prismaService: PrismaService, private matchService: MatchService){}

	addDefaultAchievements = async (intraId: number) => {
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

	getAchievements = async (intraId: number) => {
		return await this.prismaService.achievement.findMany({
			where: {
				userId: intraId,
			},
		});
	}

	progressAchievement = async (intraId: number, achievementId: number, progress: number) => {
		const achievement = await this.prismaService.achievement.findUnique({
			where: {
				id: achievementId,
			},
		});
		if (achievement.progress < achievement.progressMax) {
			await this.prismaService.achievement.update({
				where: {
					id: achievementId,
				},
				data: {
					progress: achievement.progress + progress,
				},
			});
		}
		await this.checkAchievements(intraId);
	};

	checkAchievements = async (intraId: number) => {
		const achievements = await this.prismaService.achievement.findMany({
			where: {
				userId: intraId,
			},
		});
		await achievements.forEach(async (achievement) => {
			if (achievement.isAchieved === false && achievement.progress >= achievement.progressMax) {
				await this.prismaService.achievement.update({
					where: {
						id: achievement.id,
					},
					data: {
						isAchieved: true,
					},
				});
			}
		});
	};

	isAchievedAnyAchievement = async (intraId: number) => {
		const achievements = await this.prismaService.achievement.findMany({
			where: {
				userId: intraId,
			},
		});
		const isAchieved = achievements.some((achievement) => achievement.isAchieved == true && achievement.newly == true);
		return isAchieved;
	};


	getNewlyAchieved = async (intraId: number) => {
		const achievements = await this.prismaService.achievement.findMany({
		where: {
			userId: intraId,
			isAchieved: true,
		},
		});
		const newlyAchieved = achievements.filter((achievement) => achievement.newly == true);
		achievements.forEach(async (achievement) => {
			if (achievement.newly == true) {
				await this.prismaService.achievement.update({
					where: {
						id: achievement.id,
					},
					data: {
						newly: false,
					},
				});
			}
		});	
		return newlyAchieved;
	};

	findAchievement = async (achievementName: string, user: User, progress: number) => {
		const achievements = await this.prismaService.achievement.findMany({
			where: {
				name: achievementName,
			},
		});
		achievements.forEach(async (achievement) => {
			if (achievement.userId === user.intraId && achievement.isAchieved === false)
				await this.progressAchievement(user.intraId, achievement.id, progress);
		});
	};

	progressEndGameAchievements = async (user: User) => {
		const match: Match = await this.matchService.getLastMatch(user.intraId);
		if (match.isWin === true)
		{
			await this.findAchievement("Winner Winner Chicken Dinner",  user, 1);
			await this.findAchievement("Ten Wins", user, 1);
			await this.findAchievement("One Hundred Wins", user, 1);
		}
		await this.findAchievement("One Hundred Games", user, 1);
		await this.findAchievement("Ten Games", user, 1);
		await this.findAchievement("First Blood", user, 1);
		if (user && match.isWin === true)
		{
			let change =  match.player1CashChange > 0 ? match.player1CashChange : match.player2CashChange;
			change = parseInt(change.toString());
			await this.findAchievement("Newcomer Capitalist", user, change);
			await this.findAchievement("Capitalist", user, change);
			await this.findAchievement("Elon Musk", user, change);
			await this.findAchievement("Billionaire", user, change);
		}
		if (user.nickname == match.player1 && match.player1XPChange === -1)
		{
			await this.findAchievement("Level 2", user, 1);
			await this.findAchievement("Level 5", user, 1);
			await this.findAchievement("Level 10", user, 1);
			await this.findAchievement("Level 20", user, 1);	
		}
		if (user.nickname == match.player2 && match.player2XPChange === -1)
		{
			await this.findAchievement("Level 2", user, 1);
			await this.findAchievement("Level 5", user, 1);
			await this.findAchievement("Level 10", user, 1);
			await this.findAchievement("Level 20", user, 1);	
		}
	};

}