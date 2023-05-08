import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Achievement } from "../models/achievement.model";
import { environment } from "src/environment/environment";

@Injectable()
export class AchievementService {

	constructor(private http: HttpClient) {}

	getAchievements = async (intraId: number) => {
		return await this.http.get<Achievement[]>(environment.address + '/achievement/achievements/' + intraId).toPromise();
	};

}