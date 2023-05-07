import { Body, Controller } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { MatchService } from "src/services/match.service";
import { Param } from "@nestjs/common";

@Controller('match')
export class MatchController
{
	constructor(private matchService: MatchService){}

	@Get('last-match/:intraId')
	getLastMatch(@Param('intraId') intraId: number) {
		return this.matchService.getLastMatch(+intraId);
	}

	@Get('matches/:intraId')
	getMatches(@Param('intraId') intraId: number) {
		return this.matchService.getMatches(+intraId);
	}
	
}