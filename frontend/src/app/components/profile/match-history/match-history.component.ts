import { Component } from '@angular/core';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.scss', '../profile.component.scss']
})
export class MatchHistoryComponent {


	history = [
		{ title: 'Match 1', url: '/match1', icon: 'assets/icons/history.png'},
		{ title: 'Match 2', url: '/match2', icon: 'assets/icons/history.png'},
		{ title: 'Match 3', url: '/match3', icon: 'assets/icons/history.png'},
		{ title: 'Match 4', url: '/match4', icon: 'assets/icons/history.png'},
		{ title: 'Match 5', url: '/match5', icon: 'assets/icons/history.png'},
	];
}
