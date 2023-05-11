import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { RouterService } from 'src/app/services/route.service';
import { Location } from '@angular/common';


@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {


	userLists = [
		{ name: 'Rating', sorted: [] as User[]},
		{ name: 'Wins', sorted: [] as User[]},
		{ name: 'XP', sorted: [] as User[]},
	];


	constructor(public routerService: RouterService, private leaderboardService: LeaderboardService,private router: Router,private location:Location) { }

	ngOnInit(): void {
		this.sortByRating(0);
		this.sortByWins(1);
		this.sortByXP(2);
	}

	sortByRating = (index: number) => {
		this.leaderboardService.getUsersByRating().then(
			(users: User[] | undefined) => {
				this.userLists[index].sorted = users!;
		});
	};

	sortByWins = (index: number) => {
		this.leaderboardService.getUsersByWins().then(
			(users: User[] | undefined) => {
				this.userLists[index].sorted = users!;
		});
	};

	sortByXP = (index: number) => {
		this.leaderboardService.getUsersByXp().then(
			(users: User[] | undefined) => {
				this.userLists[index].sorted = users!;
		});
	};

	goToProfile(intraId: number) {
		this.router.navigate(['/profileid', intraId]);
		this.location.replaceState('/home');  
	  }
}