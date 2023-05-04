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

	constructor(public lobbyService: LobbyService,
			private socketService: SocketService,
			private userService: UserService, 
			private playerService: PlayerService,
			private parentComponent: PlayComponent) {}

	ngOnInit(): void {
		this.socketService.sendEvent('get_lobby', null);
		this.socketService.listenToEvent('lobby').subscribe((lobby: Player[]) => {
			this.lobbyService.setLobby(lobby);
		});
		this.socketService.listenToEvent('game').subscribe((game: Game) => {
			const user: User = this.userService.getUser()!;
			this.parentComponent.inGame = true;
			this.parentComponent.game = game;
		});
	};

	join = (): void => {
		const user: User = this.userService.getUser()!;
		const player: Player = this.playerService.createPlayer(user.rating, user.nickname, user.avatarUrl, user.intraId);
		this.socketService.sendEvent('join', player);
		this.socketService.sendEvent('get_lobby', null);
	};
}
