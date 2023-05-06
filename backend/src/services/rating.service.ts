import { Injectable } from "@nestjs/common";
import { Player } from "src/models/player.model";

@Injectable()
export class RatingService {

	constructor() {}

	calculateExpectedElo = (winnerElo: number, loserElo: number, score: number): number => {
		const expectedScore: number = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
		const K = 42;
		const newElo = winnerElo + K * (score - expectedScore);
		return newElo;
	};

	//if score = 1, player1 won, if score = 0, player2 won if score = 0.5, draw
	calculateNewElo = (player1: Player, player2: Player, score: number): void => {
		let player1RatingOld = player1.rating;
		let player2RatingOld = player2.rating;
		if (score === 1)
		{
			player1.rating = this.calculateExpectedElo(player1.rating, player2.rating, 1);
			player2.rating = this.calculateExpectedElo(player2.rating, player1.rating, 0);
		}
		else if (score === 0)
		{
			player1.rating = this.calculateExpectedElo(player1.rating, player2.rating, 0);
			player2.rating = this.calculateExpectedElo(player2.rating, player1.rating, 1);
		}
		else if (score === 0.5)
		{
			player1.rating = this.calculateExpectedElo(player1.rating, player2.rating, 0.5);
			player2.rating = this.calculateExpectedElo(player2.rating, player1.rating, 0.5);
		}
		player1.rating = Math.floor(player1.rating);
		player2.rating = Math.floor(player2.rating);
		player1.eloChange = player1.rating - player1RatingOld;
		player2.eloChange = player2.rating - player2RatingOld;
	}
}