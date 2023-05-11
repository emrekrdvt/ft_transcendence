import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-profileid',
	templateUrl: './profileid.component.html',
	styleUrls: ['./profileid.component.scss']
})
export class ProfileidComponent {
	user!: User;
	stats: any = [];
	me!: User;
	path: string = '../../assets/icons/';

	pages = [
		{
			title: 'Home',
			url: '/home',
			icon: this.path + 'home.png'
		},
		{
			title: 'Achievements',
			url: '/achievements',
			icon: this.path + 'achievement.png'
		},
		{
			title: 'Match History',
			url: '/history',
			icon: this.path + 'history.png'
		},
		{
			title: 'Purchases',
			url: '/purchases',
			icon: this.path + 'purchases.png'
		}
	]

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService, private location: Location,
	) { this.me = this.userService.getUser()!; }

	ngOnInit(): void {

		const intraId = Number(this.route.snapshot.paramMap.get('intraId'));
		if (!isNaN(intraId)) {

			this.userService.getAnUser(intraId).subscribe(

				(user: User) => {
					if (user) {
						this.user = user;
						if (this.me.intraId === this.user.intraId) {
							this.router.navigate(['/profile']);
							this.location.replaceState('/home');
						}
						this.stats = [
							{ value: this.user.wins, label: 'Wins' },
							{ value: this.user.losses, label: 'Losses' },
							{ value: this.userService.getUsersWinrate(this.user), label: 'W/L' },
							{ value: this.user.games, label: 'Games' },
							{ value: this.user.rating, label: 'Rating' },
							{ value: this.user.cash.toFixed(2), label: 'Cash' },
						];

					} else {
						alert('User not found');
					}
				},
				(error: any) => {
					alert('Error: ' + error);
				}
			);
		} else {
			alert('Invalid user id');
		}
	}


}