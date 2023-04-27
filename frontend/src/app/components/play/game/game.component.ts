import { Component, AfterViewInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { Ball } from 'src/app/models/ball.model';
import { Player } from 'src/app/models/player.model';
import { Net } from 'src/app/models/net.model';
import { DrawService } from 'src/app/services/draw.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

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

	constructor(private gameService: GameService, private playerService: PlayerService) { }

	ngAfterViewInit(): void {
		this.htmlCanvas = this.canvas.nativeElement;
		const ctx: CanvasRenderingContext2D = this.htmlCanvas.getContext('2d')!;
		const ball: Ball = this.gameService.getBall(this.htmlCanvas.width, this.htmlCanvas.height);
		this.playerOne = this.playerService.createPlayerOne(this.htmlCanvas.height, 'mcakay');
		this.playerTwo = this.playerService.createPlayerTwo(this.htmlCanvas.width, this.htmlCanvas.height, 'mkarakul');
		const net: Net = {
			x: this.htmlCanvas.width / 2 - 1,
			y: 0,
			width: 2,
			height: 10,
			color: '#fff'
		};
		this.gameService.gameLoop(ctx, ball, this.playerOne, this.playerTwo, net, this.htmlCanvas);
	}

	onKeyDown(event: KeyboardEvent): void {
		if (event.key === 'ArrowUp')
		{
			this.playerOne.events.up = true;
			this.playerOne.events.down = false;
		}			
		else if (event.key === 'ArrowDown')
		{
			this.playerOne.events.up = false;
			this.playerOne.events.down = true;
		}
		else if (event.key === 'w')
		{
			this.playerTwo.events.up = true;
			this.playerTwo.events.down = false;
		}
		else if (event.key === 's')
		{
			this.playerTwo.events.up = false;
			this.playerTwo.events.down = true;
		}
	}

	onKeyUp(event: KeyboardEvent): void {
		if (event.key === 'ArrowUp')
			this.playerOne.events.up = false;
		else if (event.key === 'ArrowDown')
			this.playerOne.events.down = false;
		else if (event.key === 'w')
			this.playerTwo.events.up = false;
		else if (event.key === 's')
			this.playerTwo.events.down = false;
	}
}
