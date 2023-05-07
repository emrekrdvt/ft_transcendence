import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
	selector: 'app-match-history-page',
	templateUrl: './match-history-page.component.html',
	styleUrls: ['./match-history-page.component.scss']
})
export class MatchHistoryPageComponent implements OnInit{

	matches!: Match[];

	constructor(private matchService: MatchService, private router: Router) {}

	ngOnInit() {
		this.matchService.getMatches().then(
			(matches) => {
				this.matches = matches!;
			});
	};

	goToHome() {
		this.router.navigate(['/home']);
	};

	goToProfile() {
		this.router.navigate(['/profile']);
	};
}
