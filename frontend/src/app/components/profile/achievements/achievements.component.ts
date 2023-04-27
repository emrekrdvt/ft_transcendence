import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss', '../profile.component.scss']
})
export class AchievementsComponent {

	achievements = [
		{
			img: 'assets/img/achievements/achievement-1.png',
			title: 'Achievement 1',
		},
		{
			img: 'assets/img/achievements/achievement-2.png',
			title: 'Achievement 2',
		},
		{
			img: 'assets/img/achievements/achievement-3.png',
			title: 'Achievement 3',
		},
		{
			img: 'assets/img/achievements/achievement-3.png',
			title: 'Achievement 4',
		},
		{
			img: 'assets/img/achievements/achievement-3.png',
			title: 'Achievement 5',
		},
	]
}
