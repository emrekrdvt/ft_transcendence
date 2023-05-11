import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';
import { Server, Socket } from 'socket.io';

@Injectable()
export class MatchmakingService {
	CANVAS_WIDTH = 1024;
	CANVAS_HEIGHT = 768;
	games: Game[] = [];

	generateId = (): string => {
		return Math.random().toString(36).substring(2, 15);
	}

	getClient = (clientId: string, server: Server): Socket => {
		return server.sockets.sockets.get(clientId);
	};

	createGame = (type: string, player1: Player, player2: Player): Game => {
		let ball = {
			x: this.CANVAS_WIDTH / 2,
			y: this.CANVAS_HEIGHT / 2,
			velocityX: 6,
			velocityY: 6,
			size: 10,
		};
		if (type == 'modded')
		{
			ball.size = 8;
			ball.velocityX = 7;
			ball.velocityY = 7;
		}
		const game: Game = {
			player1: player1,
			player2: player2,
			id: this.generateId(),
			ball: ball,
			canvasWidth: this.CANVAS_WIDTH,
			canvasHeight: this.CANVAS_HEIGHT,
			isFinished: false,
			finish: type === 'modded' ? 10 : 5,
			mode: type,
		};
		return game;
	};

	oneVersusOne = (challanger: Player, challenged: Player): void => {
		const game = this.createGame('modded', challanger, challenged);
		this.games.push(game);
	};

	matchPlayers = (type: string, lobby: Player[], server: Server, callback: Function): void => {
		const sortedLobby: Player[] = lobby.sort((a, b) => b.rating - a.rating);
		
		while (sortedLobby.length > 1) {
			let player1 = sortedLobby.shift();
			let player2 = sortedLobby.shift();
			player1 = this.createPlayer1(player1, type);
			player2 = this.createPlayer2(player2, type);
			const game = this.createGame(type, player1, player2);
			this.getClient(player1.clientId, server).join(game.id);
			this.getClient(player2.clientId, server).join(game.id);
			this.games.push(game);
			callback(player1.clientId, player2.clientId);
		}
	};

	createPlayer1 = (player: Player, type: string) => {
		player.x = 0;
		player.y = this.CANVAS_HEIGHT / 2 - 50;
		player.speed = 1000;
		player.score = 0;
		player.width = 10;
		player.height = 100;
		player.up = false;
		player.down = false;
		if (type == 'modded')
		{
			player.width = 8;
			player.height = 140;
			player.speed = 1200;
		}
		return player;
	}

	createPlayer2 = (player: Player, type: string) => {
		player.x = this.CANVAS_WIDTH - 10;
		player.y = this.CANVAS_HEIGHT / 2 - 50;
		player.speed = 1000;
		player.score = 0;
		player.width = 10;
		player.height = 100;
		player.up = false;
		player.down = false;
		if (type == 'modded')
		{
			player.width = 8;
			player.height = 140;
			player.speed = 1200;
		}
		return player;
	}

	getGames = (): Game[] => this.games;
	getGameById = (gameId: string): Game => {
		return this.games.find((game: Game): boolean => game.id === gameId);
	};

	getGameByClientId = (clientId: string): Game => {
		return this.games.find((game: Game): boolean => game.player1.clientId === clientId || game.player2.clientId === clientId);
	}
}
