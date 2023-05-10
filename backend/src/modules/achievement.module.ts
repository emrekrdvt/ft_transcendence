import { Module } from "@nestjs/common";
import { AchievementController } from "src/controllers/achievement.controller";
import { AchievementService } from "src/services/achievement.service";
import { MatchService } from "src/services/match.service";
import { MatchModule } from "./match.module";

@Module(
	{ 
		imports: [ MatchModule ],
		controllers: [ AchievementController ],
		providers: [ AchievementService, MatchService],
		exports: [ AchievementService ]
	}
)
export class AchievementModule {}