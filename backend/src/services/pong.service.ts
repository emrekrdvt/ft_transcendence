import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';
import { Server, Socket } from 'socket.io';

@Injectable()
export class PongService {

	collisionDetection = (match: Match, player: Player, add: number) => {
		if (match.ball.x  < player.x + player.width + add
			&& match.ball.x + match.ball.size > player.x
			&& match.ball.y < player.y + player.height
			&& match.ball.y + match.ball.size > player.y) {
				return true;
			}
		return false;
	}

	getDeltaTime = (match: Match): number => {
		const now = performance.now();
		const deltaTime = (now - match.lastTime) / 1000;
		match.lastTime = now;
		return deltaTime;
	}

	scoreDetection = (match: Match, player: Player) => {
		player.score++;
		match.ball.x = match.canvasWidth / 2;
		match.ball.y = match.canvasHeight / 2;
		match.ball.velocityX = -match.ball.velocityX;
	};

	moveBall = (match: Match) => {
		match.ball.x += match.ball.velocityX;
		match.ball.y += match.ball.velocityY;
		if (this.collisionDetection(match, match.player1, 10) || this.collisionDetection(match, match.player2, 0)) {
			Math.random() > 0.5 ? match.ball.velocityY *= -1 : match.ball.velocityY *= 1;
			match.ball.velocityX *= -1;
		}
		else
		{
			if (match.ball.x + match.ball.size > match.canvasWidth)
			{
				this.scoreDetection(match, match.player1);
				return match;
			}
			else if (match.ball.x - match.ball.size < 0)
			{
				this.scoreDetection(match, match.player2);
				return match;
			}
			if (match.ball.y + match.ball.size > match.canvasHeight || match.ball.y - match.ball.size < 0)
				match.ball.velocityY *= -1;
			if (match.ball.x + match.ball.size > match.canvasWidth || match.ball.x - match.ball.size < 0)
				match.ball.velocityX *= -1;
		}
		return match;
	};

	movePlayer = (match: Match, player: Player, deltaTime: number) => {
		if (player.up)
			player.y -= player.speed * deltaTime;
		if (player.down)
			player.y += player.speed * deltaTime;
		if (player.y < 0)
			player.y = 0;
		if (player.y + player.height > match.canvasHeight)
			player.y = match.canvasHeight - player.height;
		if (player.nickname == match.player1.nickname)
			match.player1 = player;
		else
			match.player2 = player;
	};

	changePlayerState = (match: Match, player: Player, client: Socket, server: Server) => {
		if (match == null)
			return;
		if (match.player1.clientId === client.id) {
			match.player1.up = player.up;
			match.player1.down = player.down;
		}
		else if (match.player2.clientId === client.id) {
			match.player2.up = player.up;
			match.player2.down = player.down;
		};
		server.to(match.id).emit('match', match);
	};


	updateMatch = (match: Match, server: Server, roomId: string): Match => {
		const deltaTime = this.getDeltaTime(match);
		this.movePlayer(match, match.player1, deltaTime);
		this.movePlayer(match, match.player2, deltaTime);
		this.moveBall(match);
		return match;
	};

	startMatch = async (match: Match, server: Server, roomId: string): Promise<void> => {
		while (match.player1.score < 5 && match.player2.score < 5)
		{
			await new Promise(resolve => setTimeout(resolve, 10));
			this.updateMatch(match, server, roomId);
			server.to(roomId).emit('match', match);
		}
		server.sockets.sockets[match.player1.clientId].leave(roomId);
		server.sockets.sockets[match.player2.clientId].leave(roomId);
	};
}
