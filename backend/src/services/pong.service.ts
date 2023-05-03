import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

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
				return;
			}
			else if (match.ball.x - match.ball.size < 0)
			{
				this.scoreDetection(match, match.player2);
				return;
			}
			if (match.ball.y + match.ball.size > match.canvasHeight || match.ball.y - match.ball.size < 0)
				match.ball.velocityY *= -1;
			if (match.ball.x + match.ball.size > match.canvasWidth || match.ball.x - match.ball.size < 0)
				match.ball.velocityX *= -1;
		}
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
	};
}
