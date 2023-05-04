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

	match!: Game;

	constructor(private drawService: DrawService, private socketService: SocketService, private userService: UserService){}

	ngOnInit(): void {
	}

	findPlayer = () => {
		const user: User = this.userService.getUser()!;
		if (this.match.player1.nickname == user.nickname)
			return this.match.player1;
		else if (this.match.player2.nickname == user.nickname)
			return this.match.player2;
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

	gameLoop = (ctx: CanvasRenderingContext2D, match: Game, net: Net, canvas: HTMLCanvasElement) => {
		if (this.match == undefined)
			this.match = match;
		this.socketService.listenToEvent('match').subscribe((game: Game) => {
			this.match = game;
		});
		this.drawService.draw(ctx, this.match.ball, this.match.player1, this.match.player2, net, canvas);
		requestAnimationFrame(() => this.gameLoop(ctx, this.match, net, canvas));
	}
}