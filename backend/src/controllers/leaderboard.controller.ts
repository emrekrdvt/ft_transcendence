import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "src/services/leaderboard.service";

@Controller('leaderboard')
export class LeaderboardController {

	constructor(private leaderboardService: LeaderboardService) { }

	@Get('rating')
	getUsersByRating() {
		return this.leaderboardService.getUsersByRating();
	};

	@Get('wins')
	getUsersByWins() {
		return this.leaderboardService.getUsersByWins();
	};

	@Get('xp')
	getUsersByXp() {
		return this.leaderboardService.getUsersByXp();
	};

}