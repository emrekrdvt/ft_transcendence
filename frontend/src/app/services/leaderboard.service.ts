import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { User } from "../models/user.model";

@Injectable()
export class LeaderboardService {

	constructor(private http: HttpClient) { }

	getUsersByRating = async () => {
		return await this.http.get<User[]>(environment.address + '/leaderboard/rating').toPromise();
	};

	getUsersByWins = async () => {
		return await this.http.get<User[]>(environment.address + '/leaderboard/wins').toPromise();
	};

	getUsersByXp = async () => {
		return await this.http.get<User[]>(environment.address + '/leaderboard/xp').toPromise();
	};
}