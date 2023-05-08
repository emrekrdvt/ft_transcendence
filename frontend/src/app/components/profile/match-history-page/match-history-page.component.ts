import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/route.service';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
	selector: 'app-match-history-page',
	templateUrl: './match-history-page.component.html',
	styleUrls: ['./match-history-page.component.scss']
})
export class MatchHistoryPageComponent implements OnInit{

	matches!: Match[];

	constructor(public routerService: RouterService, private matchService: MatchService) {}

	ngOnInit() {
		this.matchService.getMatches().then(
			(matches) => {
				this.matches = matches!;
			});
	};

}
