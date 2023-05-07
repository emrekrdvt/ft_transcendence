import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { Match } from "../models/match.model";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable()
export class MatchService
{
	user: User = this.userService.getUser()!;

	constructor(private http: HttpClient, private userService: UserService){}

	getLastMatch = async () => {
		return await this.http.get<Match>(environment.address + '/match/last-match/' + this.user.intraId).toPromise();
	}

	getMatches = async () => {
		return await this.http.get<Match[]>(environment.address + '/match/matches/' + this.user.intraId).toPromise();
	}
}