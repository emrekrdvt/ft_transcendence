import { Component } from '@angular/core';
import { Achievement } from 'src/app/models/achievement.model';
import { User } from 'src/app/models/user.model';
import { AchievementService } from 'src/app/services/achievement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-achieve',
	templateUrl: './achieve.component.html',
	styleUrls: ['./achieve.component.scss']
})
export class AchieveComponent {

	achievedAchievements: Achievement[] = [];

	constructor(private achievementService: AchievementService,
		private userService: UserService) { }

	ngOnInit(): void {
		const user = this.userService.getUser() as User;
		this.achievementService.getNewlyAchieved(user.intraId).then((achievements) => {
			this.achievedAchievements = achievements as Achievement[];
		});
	};

	closeAchieveScreen = () => {
		this.achievementService.setFalseToIsAchieved();
	};
}
