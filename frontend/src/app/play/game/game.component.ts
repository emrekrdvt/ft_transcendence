import { Component, AfterViewInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/models/ball.model';
import { Player } from 'src/app/models/player.model';
import { Net } from 'src/app/models/net.model';
import { DrawService } from 'src/app/services/draw.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

	@ViewChild('game', {static: false})
	canvas!: ElementRef<HTMLCanvasElement>;

	playerOne !: Player;
	playerTwo !: Player;

	htmlCanvas !: HTMLCanvasElement;

	constructor(private gameService: GameService) { }

	ngAfterViewInit(): void {
		this.htmlCanvas = this.canvas.nativeElement;
		const ctx: CanvasRenderingContext2D = this.htmlCanvas.getContext('2d')!;
		const Ball: Ball = this.gameService.getBall(this.htmlCanvas.width, this.htmlCanvas.height);
		this.playerOne = this.gameService.getPlayerOne(this.htmlCanvas.height);
		this.playerTwo = this.gameService.getPlayerTwo(this.htmlCanvas.width, this.htmlCanvas.height);
		const net: Net = {
			x: this.htmlCanvas.width / 2 - 1,
			y: 0,
			width: 2,
			height: 10,
			color: '#fff'
		};	
		this.gameService.gameLoop(ctx, Ball, this.playerOne, this.playerTwo, net, this.htmlCanvas);
	}

	onKeyUp(event: KeyboardEvent): void {
		this.gameService.movePaddle(event, this.htmlCanvas, this.playerOne);
		

	}
}
