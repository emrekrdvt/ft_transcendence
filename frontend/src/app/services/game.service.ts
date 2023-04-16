import { Injectable } from '@angular/core';
import { Ball } from 'src/app/models/ball.model';
import { Player } from '../models/player.model';
import { DrawService } from './draw.service';


@Injectable()
export class GameService {
	

	constructor(private drawService: DrawService) {}

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

	getPlayerOne = (canvasHeight: number): Player => {
		const playerOne: Player = {
			x: 0,
			y: canvasHeight / 2 - 50,
			width: 10,
			height: 100,
			score: 0,
			name : 'Player 1'
		};
		return playerOne;
	}

	getPlayerTwo = (canvasWidth: number, canvasHeight: number): Player => {
		const playerTwo: Player = {
			x: canvasWidth - 10,
			y: canvasHeight / 2 - 50,
			width: 10,
			height: 100,
			score: 0,
			name : 'Player 2'
		};
		return playerTwo;
	}

	movePaddle = (event: KeyboardEvent, canvas: HTMLCanvasElement, player: Player): void => {
		if (event.key === 'ArrowUp') {
			if (player.y - 100 > 0)
				player.y -= 100;
			else
				player.y = 0;
		}
		else if (event.key === 'ArrowDown') {
			if (player.y + 100 < canvas.height - player.height)	
				player.y += 100;
			else
				player.y = canvas.height - player.height;
		}
	}

	moveBall = (ball: Ball, canvas: HTMLCanvasElement, playerOne: Player, playerTwo: Player): void => {	
		
		
		ball.x += ball.dx;
		ball.y += ball.dy;
		if (this.collisonDetection(ball, playerOne, 10) || this.collisonDetection(ball, playerTwo, 0)) {
			Math.random() > 0.5 ? ball.dy *= -1 : ball.dy *= 1;
			ball.dx *= -1;
		}
		else
		{
			if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0)
				ball.dy *= -1;
			if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0)
				ball.dx *= -1;
		}
	}

	collisonDetection = (ball: Ball, player: Player, add: number): Boolean => {
		if (ball.x < player.x + player.width + add &&
			ball.x + ball.size > player.x &&
			ball.y < player.y + player.height &&
			ball.y + ball.size > player.y)
			return true;
		return false;
	}

	gameLoop = (ctx: CanvasRenderingContext2D, ball: Ball, playerOne: Player, playerTwo: Player, net: any, canvas: HTMLCanvasElement): void => {
		this.moveBall(ball, canvas, playerOne, playerTwo);
		this.drawService.draw(ctx, ball, playerOne, playerTwo, net, canvas);
		requestAnimationFrame(() => this.gameLoop(ctx, ball, playerOne, playerTwo, net, canvas));
	}
}