import { Body, Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { MatchService } from "src/services/match.service";

@Controller('match')
export class MatchController
{
	constructor(private matchService: MatchService){}

	@Get('last-match')
	getLastMatch(@Body() intraId: number) {
		return this.matchService.getLastMatch(intraId);
	}

	@Get('matches')
	getMatches(@Body() intraId: number) {
		return this.matchService.getMatches(intraId);
	}
	
}