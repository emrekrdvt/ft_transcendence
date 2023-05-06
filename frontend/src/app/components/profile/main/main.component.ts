import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	stats: any = [];

	constructor(public profile: ProfileComponent) {
		
	}

	ngOnInit(): void {
		this.stats = [
			{ value: this.profile.user.wins, label: 'Wins' },
			{ value: this.profile.user.losses, label: 'Losses' },
			{ value: this.profile.user.draws, label: 'Draws' },
			{ value: this.profile.user.games, label: 'Games' },
			{ value: this.profile.user.rating, label: 'Rating' },
			{ value: this.profile.user.cash.toFixed(2), label: 'Cash'},
		];
	}

}
