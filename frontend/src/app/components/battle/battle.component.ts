import { Component } from '@angular/core';
import { BattleService } from 'src/app/services/battle.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SocketService } from 'src/app/services/socket.service';
import { SocialComponent } from '../social/social.component';

@Component({
	selector: 'app-battle',
	templateUrl: './battle.component.html',
	styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
	status: string = 'opened';
	user: User = this.userService.getUser()!;

	constructor( private userService: UserService, private socketService: SocketService, public socialComponent: SocialComponent) { }

	ngOnInit(): void {
		
	};

	close = () => { 
		this.socialComponent.battleService.setRequests([]);
		this.socialComponent.battleRequests = [];
		this.socialComponent.requests = [];
		this.socketService.sendEvent('closeBattleRequests', { myID: this.user.intraId });
		this.socialComponent.isChallenged = false;
		
	};

	acceptBattleRequest = (request: any) => {
		this.socialComponent.battleService.joinBattle(request);
	};

	declineBattleRequest = (request: any) => {
		this.socketService.sendEvent('removeBattleRequest', { myID: this.user.intraId, hisID: request.challanger.intraId });
	};
}
