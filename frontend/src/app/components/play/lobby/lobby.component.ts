import { Component } from '@angular/core';
import { LobbyService } from 'src/app/services/lobby.service';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from 'src/app/models/player.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { PlayerService } from 'src/app/services/player.service';
import { PlayComponent } from '../play.component';
import { Game } from 'src/app/models/game.model';

@Component({
	selector: 'app-lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {

	user: User = this.userService.getUser()!;

	constructor(public lobbyService: LobbyService,
			private socketService: SocketService,
			private userService: UserService, 
			private playerService: PlayerService,
			public play: PlayComponent) {}

	ngOnInit(): void {
		this.socketService.sendEvent('status_connect', this.user.intraId);
		this.socketService.listenToEvent('game').subscribe((game: Game) => {
			const user: User = this.userService.getUser()!;
			this.play.inGame = true;
			this.play.game = game;
		});
		this.socketService.sendEvent('get_lobby', this.play.selected);
		this.socketService.listenToEvent('lobby').subscribe((data: {lobby: Player[], type: string}) => {
			if (this.play.selected === data.type)
				this.lobbyService.setLobby(data.lobby);
		});
	};

	join = (): void => {
		const player: Player = this.playerService.createPlayer(this.user.rating, this.user.nickname, this.user.avatarUrl, this.user.intraId);
		this.play.switch.default = !this.play.switch.default;
		this.play.switch.modded = !this.play.switch.modded;
		this.socketService.sendEvent('join', {player: player, type: this.play.selected});
		this.socketService.sendEvent('get_lobby', this.play.selected);
		this.socketService.sendEvent('ingame', this.user.intraId);
	};

	leave = (): void => {
		if (this.play.selected === 'default')
			this.play.switch.default = !this.play.switch.default;
		else
			this.play.switch.modded = !this.play.switch.modded;
		this.socketService.sendEvent('leave_lobby', this.play.selected);
		this.socketService.sendEvent('get_lobby', this.play.selected);
	};
}
