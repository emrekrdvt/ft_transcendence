import { Component } from '@angular/core';
import { AchievementService } from './services/achievement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(public achievementService: AchievementService) { }

	title = 'ponghub';
}
