import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Game } from "../models/game.model";
import { environment } from "src/environment/environment";

@Injectable()
export class MatchService
{
	constructor(private http: HttpClient){}

	getLastMatch = () => {
		this.http.get<Game>(environment.address + '/match/last-match').subscribe(
			(game: Game) => {
				console.log(game);
				return game;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}