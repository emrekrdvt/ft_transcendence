import { Module } from "@nestjs/common";
import { LeaderboardController } from "src/controllers/leaderboard.controller";
import { LeaderboardService } from "src/services/leaderboard.service";

@Module(
	{
		controllers: [ LeaderboardController ],
		providers: [ LeaderboardService ],
	}
)
export class LeaderboardModule {}