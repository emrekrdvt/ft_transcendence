import { Injectable } from "@angular/core";
import { Ball } from "../models/ball.model";
import { Net } from "../models/net.model";
import { Player } from "../models/player.model";

@Injectable()
export class DrawService {

	constructor() {}

	clearCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, w, h);
	}

	drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void => {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}

	drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string): void => {
		ctx.fillStyle = color;
		ctx.font = '70px courier new';
		ctx.fillText(text, x, y);
	}

	drawNet = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, net: Net): void => {
		for (let i = 0; i <= canvas.height; i += 15)
			this.drawRect(ctx, net.x, net.y + i, net.width, net.height, net.color);
	}

	draw = (ctx: CanvasRenderingContext2D, ball: Ball, playerOne: Player, playerTwo: Player, net: Net, canvas: HTMLCanvasElement): void => {
		this.clearCanvas(ctx, canvas);
		this.drawRect(ctx, 0, 0, 1024, 768, '#000');

		if (playerOne.score && playerTwo.score)
		{
			this.drawText(ctx, playerOne.score.toString(), canvas.width / 4, canvas.height / 6, '#fff');
			this.drawText(ctx, playerTwo.score.toString(), (3 * canvas.width) / 4, canvas.height / 6, '#fff');
		}
		

		this.drawNet(ctx, canvas, net);

		this.drawRect(ctx, playerOne.x, playerOne.y, playerOne.width, playerOne.height, '#fff');
		this.drawRect(ctx, playerTwo.x, playerTwo.y, playerTwo.width, playerTwo.height, '#fff');

		this.drawCircle(ctx, ball.x, ball.y, ball.size, '#fff');
	}
}
