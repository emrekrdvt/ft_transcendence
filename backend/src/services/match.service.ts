import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';
import { Server, Socket } from 'socket.io';

@Injectable()
export class MatchService {
	CANVAS_WIDTH = 1024;
	CANVAS_HEIGHT = 768;
	matches: Match[] = [];

	generateId = (): string => {
		return Math.random().toString(36).substring(2, 15);
	}

	getClient = (clientId: string, server: Server): Socket => {
		return server.sockets.sockets.get(clientId);
	};

	matchPlayers = (lobby: Player[], server: Server, callback: Function): void => {
		const sortedLobby: Player[] = lobby.sort((a, b) => b.rating - a.rating);
		while (sortedLobby.length > 1) {
			let player1 = sortedLobby.shift();
			let player2 = sortedLobby.shift();
			const ball = {
				x: this.CANVAS_WIDTH / 2,
				y: this.CANVAS_HEIGHT / 2,
				velocityX: 6,
				velocityY: 6,
				size: 10,
			};
			const match: Match = {
				player1: player1,
				player2: player2,
				id: this.generateId(),
				ball: ball,
				canvasWidth: this.CANVAS_WIDTH,
				canvasHeight: this.CANVAS_HEIGHT,
			};
			player1 = this.createPlayer1(player1);
			player2 = this.createPlayer2(player2);
			this.getClient(player1.clientId, server).join(match.id);
			this.getClient(player2.clientId, server).join(match.id);
			this.matches.push(match);
			callback(player1.clientId, player2.clientId);
		}
	};

	createPlayer1 = (player: Player) => {
		player.x = 0;
		player.y = this.CANVAS_HEIGHT / 2 - 50;
		player.speed = 1000;
		player.score = 0;
		player.width = 10;
		player.height = 100;
		player.up = false;
		player.down = false;
		return player;
	}

	createPlayer2 = (player: Player) => {
		player.x = this.CANVAS_WIDTH - 10;
		player.y = this.CANVAS_HEIGHT / 2 - 50;
		player.speed = 1000;
		player.score = 0;
		player.width = 10;
		player.height = 100;
		player.up = false;
		player.down = false;
		return player;
	}

	updateMatch = (match: Match): void => {
		for (let i = 0; i < this.matches.length; i++) {
			if (this.matches[i].id === match.id) {
				this.matches[i] = match;
				break;
			}
		}
	};

	getMatches = (): Match[] => this.matches;
	getMatchById = (matchId: string): Match => {
		return this.matches.find((match: Match): boolean => match.id === matchId);
	};

	getMatchByClientId = (clientId: string): Match => {
		return this.matches.find((match: Match): boolean => match.player1.clientId === clientId || match.player2.clientId === clientId);
	}
}
