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

	constructor(private http: HttpClient, private userService: UserService) {}

	getAchievements = async (intraId: number) => {
		return await this.http.get<Achievement[]>(environment.address + '/achievement/achievements/' + intraId).toPromise();
	};

	checkAchievements = async (intraId: number) => {
		return await this.http.get<boolean>(environment.address + '/achievement/checkAchievement/' + intraId).toPromise();
	};

	progressAchievement = async (intraId: number, achievementId: number) => {
		return await this.http.post(environment.address + '/achievement/progress/' + intraId + '/' + achievementId, null).toPromise();
	};

	getNewlyAchieved = async (intraId: number) => {
		return await this.http.get<Achievement[]>(environment.address + '/achievement/newlyAchieved/' + intraId).toPromise();
	};
}