import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { TwoFactorAuthService } from 'src/app/services/twoFactor.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	edit: boolean = false;
	stats: any = [];
	toggle: string = 'off';
	qrCodeUrl!: string;
	

	constructor(public profile: ProfileComponent, private userService: UserService, private profileService: ProfileService,
		private twoFactorService: TwoFactorAuthService) { }

	ngOnInit(): void {
		this.stats = [
			{ value: this.profile.user.wins, label: 'Wins' },
			{ value: this.profile.user.losses, label: 'Losses' },
			{ value: this.userService.getUsersWinrate(this.profile.user), label: 'W/L' },
			{ value: this.profile.user.games, label: 'Games' },
			{ value: this.profile.user.rating, label: 'Rating' },
			{ value: this.profile.user.cash.toFixed(2), label: 'Cash' },
		];
		if (this.profile.user.twoFactor)
			this.toggle = 'on';
	};

	updateQrCode = (url: string) => {
		this.qrCodeUrl = url;
	};

	switch = () => {
		if (this.profileService.aboutInput !== '')
			this.profileService.updateAbout(this.profile.user);
		if (this.profileService.nicknameInput !== '')
			this.profileService.updateNickname(this.profile.user);
		if (this.profileService.reader.result !== null)
			this.profileService.uploadPhoto(this.profile.user);
		if (this.toggle === 'on' && !this.profile.user.twoFactor)
		{
			this.profileService.updateTwoFactor(this.profile.user);
			this.twoFactorService.generateQRCodeAndShow(this.profile.user.username).subscribe((res: any) => {
				this.updateQrCode(res.qrCode);
			});
		}
		else if (this.toggle === 'off' && this.profile.user.twoFactor)
			this.profileService.updateTwoFactor(this.profile.user);
		this.edit = !this.edit;
	}

	takeInput = (event: any, type: string) => {
		this.profileService.takeInput(event, type);
	};

	changeToggle = () => {
		if (this.toggle === 'off')
			this.toggle = 'on';
		else
			this.toggle = 'off';
	};
}
