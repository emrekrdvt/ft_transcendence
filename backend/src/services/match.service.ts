import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

@Injectable()
export class MatchService {
	CANVAS_WIDTH = 1024;
	CANVAS_HEIGHT = 768;
	matches: Match[] = [];
	id = 0;
	matchPlayers = (lobby: Player[]): void => {
		const sortedLobby: Player[] = lobby.sort((a, b) => b.rating - a.rating);
		while (sortedLobby.length > 1) {
			const player1 = sortedLobby.shift();
			const player2 = sortedLobby.shift();
			const ball = {
				x: this.CANVAS_WIDTH / 2,
				y: this.CANVAS_HEIGHT / 2,
				velocityX: 8,
				velocityY: 8,
				size: 10,
			};
			const match: Match = {
				player1: player1,
				player2: player2,
				id: this.id,
				ball: ball,
				canvasWidth: this.CANVAS_WIDTH,
				canvasHeight: this.CANVAS_HEIGHT,
			};
			this.id++;
			this.matches.push(match);
		}
	};

	getMatches = (): Match[] => this.matches;
	getMatch = (matchId: number): Match => {
		return this.matches.find((match: Match): boolean => match.id === matchId);
	};
}
