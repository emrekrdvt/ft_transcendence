import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Achievement } from "../models/achievement.model";
import { environment } from "src/environment/environment";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable()
export class AchievementService {

	private isAchieved$ = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private userService: UserService) {}

	getAchievements = async (intraId: number) => {
		return await this.http.get<Achievement[]>(environment.address + '/achievement/achievements/' + intraId).toPromise();
	};

	checkAchievements = async (intraId: number) => {
		return await this.http.get<boolean>(environment.address + '/achievement/checkAchievement/' + intraId).toPromise();
	};

	isAchieved = async () => {
		const user: User = this.userService.getUser()!;
		await this.checkAchievements(user.intraId).then((isAchieved) => {
			this.isAchieved$.next(isAchieved as boolean);
		});
	};

	getIsAchieved = (): Observable<boolean> => {
		return this.isAchieved$.asObservable();
	};

	progressAchievement = async (intraId: number, achievementId: number) => {
		return await this.http.post(environment.address + '/achievement/progress/' + intraId + '/' + achievementId, null).toPromise();
	};

	setFalseToIsAchieved = () => {
		this.isAchieved$.next(false);
	};

	getNewlyAchieved = async (intraId: number) => {
		return await this.http.get<Achievement[]>(environment.address + '/achievement/newlyAchieved/' + intraId).toPromise();
	};
}