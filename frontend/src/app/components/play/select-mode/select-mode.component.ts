import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { PlayComponent } from '../play.component';
import { Player } from 'src/app/models/player.model';
import { LobbyService } from 'src/app/services/lobby.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-select-mode',
	templateUrl: './select-mode.component.html',
	styleUrls: ['./select-mode.component.scss']
})
export class SelectModeComponent {

	user: User = this.userService.getUser()!;

	constructor(public playComponent: PlayComponent, private socketService: SocketService, private userService: UserService) { }

	ngOnInit(): void {
		this.socketService.sendEvent('get_lobby', this.playComponent.selected);
	};

	selectMode = (mode: string) => {
		this.socketService.sendEvent('leave_lobby', this.playComponent.selected);
		this.playComponent.selected = mode;
		this.socketService.sendEvent('get_lobby', mode);
		this.playComponent.switch.default =  false;
		this.playComponent.switch.modded = false;
		this.socketService.sendEvent('status_connect', this.user.intraId);
	};
}
