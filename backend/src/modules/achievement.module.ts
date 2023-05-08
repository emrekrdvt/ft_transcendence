import { Module } from "@nestjs/common";
import { AchievementController } from "src/controllers/achievement.controller";
import { AchievementService } from "src/services/achievement.service";

@Module(
	{ 
		controllers: [ AchievementController ],
		providers: [ AchievementService ],
		exports: [ AchievementService ]
	}
)
export class AchievementModule {}