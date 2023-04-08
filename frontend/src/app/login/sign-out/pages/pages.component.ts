import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

	filePath: string = 'assets/icons/';

	pages = [
		{ title: 'About', url: '/about', icon: this.filePath + 'about.png'},
		{ title: 'Leaderboard', url: '/leaderboard', icon: this.filePath + 'leaderboard.png'},
		{ title: 'Social', url: '/social', icon: this.filePath + 'social.png'},
		{ title: 'Profile', url: '/profile', icon: this.filePath + 'profile.png'},
		{ title: 'Settings', url: '/settings', icon: this.filePath + 'settings.png'},
		{ title: 'Play', url: '/play', icon: this.filePath + 'game.png'},
	];

}
