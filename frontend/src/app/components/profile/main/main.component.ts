import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	edit: boolean = false;
	stats: any = [];
	

	constructor(public profile: ProfileComponent, private userService: UserService, private profileService: ProfileService) { }

	ngOnInit(): void {
		this.stats = [
			{ value: this.profile.user.wins, label: 'Wins' },
			{ value: this.profile.user.losses, label: 'Losses' },
			{ value: this.userService.getUsersWinrate(this.profile.user), label: 'W/L' },
			{ value: this.profile.user.games, label: 'Games' },
			{ value: this.profile.user.rating, label: 'Rating' },
			{ value: this.profile.user.cash.toFixed(2), label: 'Cash' },
		];
	};

	switch = () => {
		if (this.profileService.aboutInput !== '')
			this.profileService.updateAbout(this.profile.user);
		if (this.profileService.nicknameInput !== '')
			this.profileService.updateNickname(this.profile.user);
		if (this.profileService.reader.result !== null)
			this.profileService.uploadPhoto(this.profile.user);
		this.edit = !this.edit;
	}

	takeInput = (event: any, type: string) => {
		this.profileService.takeInput(event, type);
	};
}
