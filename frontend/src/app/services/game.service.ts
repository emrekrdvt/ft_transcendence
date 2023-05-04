import { Injectable } from "@angular/core";
import { Game } from "../models/game.model";
import { Net } from "../models/net.model";
import { DrawService } from "./draw.service";
import { SocketService } from "./socket.service";
import { OnInit } from "@angular/core";
import { Player } from "../models/player.model";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable()
export class GameService implements OnInit{

	game!: Game;

	constructor(private drawService: DrawService, private socketService: SocketService, private userService: UserService){}

	ngOnInit(): void {
	}

	findPlayer = () => {
		const user: User = this.userService.getUser()!;
		if (this.game.player1.nickname == user.nickname)
			return this.game.player1;
		else if (this.game.player2.nickname == user.nickname)
			return this.game.player2;
		return null;
	};

	onKeyDown = (event: KeyboardEvent) => {
		const player: Player = this.findPlayer()!;
		if (event.key === 'w')
		{
			player.up = true;
			player.down = false;
		}
		else if (event.key === 's')
		{
			player.up = false;
			player.down = true;
		}
		this.socketService.sendEvent('move_paddle', player);
	};

	onKeyUp = (event: KeyboardEvent) => {
		const player: Player  = this.findPlayer()!;
		if (event.key === 'w')
			player.up = false;
		else if (event.key == 's')
			player.down = false;
		this.socketService.sendEvent('move_paddle', player);
	};


	gameLoop = (ctx: CanvasRenderingContext2D, game: Game, net: Net, canvas: HTMLCanvasElement) => {
		if (this.game == undefined)
			this.game = game;
		this.socketService.listenToEvent('game').subscribe((game: Game) => {
			this.game = game;
		});
		this.socketService.listenToEvent('endGame').subscribe(() => {
			this.userService.getUserFromDb();
			return;
		});
		this.drawService.draw(ctx, this.game.ball, this.game.player1, this.game.player2, net, canvas);
		requestAnimationFrame(() => this.gameLoop(ctx, this.game, net, canvas));
	}
}