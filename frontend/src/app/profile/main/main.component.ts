import { Component } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

	stats = [
		{ value: 0, label: 'Wins' },
		{ value: 0, label: 'Losses' },
		{ value: 0, label: 'Draws' },
		{ value: 0, label: 'Games' },
		{ value: 0, label: 'Rating' },
		{ value: 0, label: 'Rank'}
	];


	constructor(public profile: ProfileComponent) { }

}
