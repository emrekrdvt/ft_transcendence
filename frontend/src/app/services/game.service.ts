import { Injectable } from '@angular/core';
import { Ball } from 'src/app/models/ball.model';
import { Player } from '../models/player.model';
import { DrawService } from './draw.service';


@Injectable()
export class GameService {
	
	lastTime: number = 0;

	constructor(private drawService: DrawService) {}

	getDeltaTime = (): number => {
		const now = performance.now();
		const deltaTime = (now - this.lastTime) / 1000;
		this.lastTime = now;
		return deltaTime;
	}

	getBall = (canvasWidth: number, canvasHeight: number): Ball => {
		const ball: Ball = {
			x: canvasWidth / 2,
			y: canvasHeight / 2,
			size: 10,
			dx: 8,
			dy: 8
		};
		return ball;
	}

	

	movePaddle = (canvas: HTMLCanvasElement, player: Player, deltaTime: number): void => {
		if (player.events.up === true) {
			if (player.y - player.speed * deltaTime > 0)
				player.y -= player.speed * deltaTime;
			else
				player.y = 0;
		}
		else if (player.events.down) {
			if (player.y + player.speed * deltaTime < canvas.height - player.height)	
				player.y += player.speed * deltaTime;
			else
				player.y = canvas.height - player.height;
		}
	}

	moveBall = (ball: Ball, canvas: HTMLCanvasElement, playerOne: Player, playerTwo: Player, deltaTime: number): void => {	
		
		
		ball.x += ball.dx;
		ball.y += ball.dy;
		if (this.collisonDetection(ball, playerOne, 10) || this.collisonDetection(ball, playerTwo, 0)) {
			Math.random() > 0.5 ? ball.dy *= -1 : ball.dy *= 1;
			ball.dx *= -1;
		}
		else
		{
			if (ball.x + ball.size > canvas.width) {
				playerOne.score++;
				ball.x = canvas.width / 2;
				ball.y = canvas.height / 2;
				ball.dx *= -1;
				return;
			}
			else if (ball.x - ball.size < 0) {
				playerTwo.score++;
				ball.x = canvas.width / 2;
				ball.y = canvas.height / 2;
				ball.dx *= -1;
				return;
			}
			if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0)
				ball.dy *= -1;
			if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0)
				ball.dx *= -1;
		}
	}

	collisonDetection = (ball: Ball, player: Player, add: number): Boolean => {
		if (ball.x < player.x + player.width + add &&
			ball.x + ball.size> player.x &&
			ball.y < player.y + player.height &&
			ball.y + ball.size> player.y)
			return true;
		return false;
	}

	gameLoop = (ctx: CanvasRenderingContext2D, ball: Ball, playerOne: Player, playerTwo: Player, net: any, canvas: HTMLCanvasElement): void => {
		const deltaTime = this.getDeltaTime();
		this.moveBall(ball, canvas, playerOne, playerTwo, deltaTime);
		this.movePaddle(canvas, playerOne, deltaTime);
		this.movePaddle(canvas, playerTwo, deltaTime);
		this.drawService.draw(ctx, ball, playerOne, playerTwo, net, canvas);
		requestAnimationFrame(() => this.gameLoop(ctx, ball, playerOne, playerTwo, net, canvas));
		
	}
}