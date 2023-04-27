import { Component,  OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Seeker } from 'src/app/models/seeker.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

	public lobbyUsers: Seeker[] = [];
	size: number = 0;

	constructor(private socketService: SocketService, private userService: UserService) { }

	findGame = () => {
		const user: User = this.userService.getUser()!;
		const seeker: Seeker = {nickname: user.nickname, avatarUrl: user.avatarUrl, rating: user.rating, intraId: user.intraId};
		this.socketService.sendEvent('findGame', seeker);
		this.socketService.sendEvent('listSeekers', null);
	}


	ngOnInit(): void {
		this.socketService.sendEvent('listSeekers', null);
		this.socketService.listenToEvent('seekers').subscribe((seekers: Seeker[]) => {
			this.lobbyUsers = seekers;
			this.size = seekers.length;
		});
	}
}
