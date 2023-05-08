import { Component } from '@angular/core';
import { Achievement } from 'src/app/models/achievement.model';
import { AchievementService } from 'src/app/services/achievement.service';
import { RouterService } from 'src/app/services/route.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'app-achievements-page',
	templateUrl: './achievements-page.component.html',
	styleUrls: ['./achievements-page.component.scss']
})
export class AchievementsPageComponent {

	achievements: Achievement[] = [];

	constructor(public routerService: RouterService,
		private achievementService: AchievementService,
		private userService: UserService) { }

	ngOnInit(): void {
		const user: User = this.userService.getUser()!;
		this.achievementService.getAchievements(user.intraId).then((achievements) => {
			this.achievements = achievements!;
		});
	};
}
