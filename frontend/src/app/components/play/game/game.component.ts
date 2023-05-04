import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { SocketService } from 'src/app/services/socket.service';
import { GameService } from 'src/app/services/game.service';
import { Net } from 'src/app/models/net.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Player } from 'src/app/models/player.model';
import { PlayComponent } from '../play.component';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit, OnInit {
	@ViewChild('gameCanvas', {static: false})
	canvas!: ElementRef<HTMLCanvasElement>;

	match!: Game;

	constructor(private socketService: SocketService,
			private gameService: GameService,
			private userService: UserService,
			private playComponent: PlayComponent) { }

	ngOnInit(): void {
		this.match = this.playComponent.game;
	};

	ngAfterViewInit(): void {
		const htmlCanvas: HTMLCanvasElement = this.canvas.nativeElement;
		const ctx: CanvasRenderingContext2D = htmlCanvas.getContext('2d')!;
		const net: Net = {
			x: htmlCanvas.width / 2 - 1,
			y: 0,
			width: 2,
			height: 10,
			color: '#fff'
		};
		this.gameService.gameLoop(ctx, this.match, net, htmlCanvas);
	};

	onKeyDown = (event: KeyboardEvent) => {
		this.gameService.onKeyDown(event);
		
	};

	onKeyUp = (event: KeyboardEvent) => {
		this.gameService.onKeyUp(event);
	};
}
