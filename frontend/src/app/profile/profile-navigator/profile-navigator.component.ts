import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-navigator',
  templateUrl: './profile-navigator.component.html',
  styleUrls: ['./profile-navigator.component.scss']
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
			title: 'Purchases',
			url: '/purchases',
			icon: this.path + 'purchases.png'
		},
		{
			title: 'Preferences',
			url: '/preferences',
			icon: this.path + 'preferences.png'
		},
	]

}
