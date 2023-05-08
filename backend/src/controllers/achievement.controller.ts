import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { AchievementService } from "src/services/achievement.service";

@Controller('achievement')
export class AchievementController {

	constructor(private achievementService: AchievementService) {}

	@Post('create')
	createAchievement(@Body() body: { name: string, progressMax: number, description: string, url: string }) {
		return this.achievementService.createAchievement(body.name, body.progressMax, body.description, body.url);
	};

	@Get('achievements/:intraId')
	getAchievements(@Param('intraId') intraId: number) {
		return this.achievementService.getAchievements(+intraId);
	}
}