import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";
import { Match } from "../models/match.model";

@Injectable()
export class MatchService
{
	constructor(private http: HttpClient){}

	getLastMatch = () => {
		this.http.get<Match>(environment.address + '/match/last-match').subscribe(
			(game: Match) => {
				localStorage.setItem('lastMatch', JSON.stringify(game));
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getMatches = async () => {
		return await this.http.get<Match[]>(environment.address + '/match/matches').toPromise();
	}
}