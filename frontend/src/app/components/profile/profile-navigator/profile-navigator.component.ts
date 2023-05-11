import { Component } from '@angular/core';

@Component({
	selector: 'app-profile-navigator',
	templateUrl: './profile-navigator.component.html',
	styleUrls: ['./profile-navigator.component.scss', '../profile.component.scss']
})
export class ProfileNavigatorComponent {

	path: string = '../assets/icons/';

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
			title: 'Inventory',
			url: '/inventory',
			icon: this.path + 'purchases.png'
		},
	]

}
