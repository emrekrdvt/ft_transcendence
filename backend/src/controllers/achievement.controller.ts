import { Controller, Param, Get } from "@nestjs/common";
import { AchievementService } from "src/services/achievement.service";

@Controller('achievement')
export class AchievementController {

	constructor(private achievementService: AchievementService) {}

	@Get('achievements/:intraId')
	getAchievements(@Param('intraId') intraId: number) {
		return this.achievementService.getAchievements(+intraId);
	}

	@Get('checkAchievement/:intraId')
	checkAchievements(@Param('intraId') intraId: number) {
		return this.achievementService.isAchievedAnyAchievement(+intraId);
	};

	@Get('newlyAchieved/:intraId')
	getNewlyAchieved(@Param('intraId') intraId: number) {
		return this.achievementService.getNewlyAchieved(+intraId);
	}
}