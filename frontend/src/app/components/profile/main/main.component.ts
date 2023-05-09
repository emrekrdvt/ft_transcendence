import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	stats: any = [];

	constructor(public profile: ProfileComponent, private userService: UserService) {
		
	}

	ngOnInit(): void {
		this.stats = [
			{ value: this.profile.user.wins, label: 'Wins' },
			{ value: this.profile.user.losses, label: 'Losses' },
			{ value: this.userService.getUsersWinrate(this.profile.user), label: 'W/L' },
			{ value: this.profile.user.games, label: 'Games' },
			{ value: this.profile.user.rating, label: 'Rating' },
			{ value: this.profile.user.cash.toFixed(2), label: 'Cash'},
		];
	}

}
