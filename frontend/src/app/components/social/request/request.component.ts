import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BattleService } from 'src/app/services/battle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-request',
	templateUrl: './request.component.html',
	styleUrls: ['./request.component.scss', '../social.component.scss']
})
export class RequestComponent {

	friendRequests: any[] = [];

	constructor(private userService: UserService) { }

	ngOnInit(){
		const user : User = this.userService.getUser()!;
		this.userService.getFriendRequests().subscribe((friendRequests) => {
			friendRequests.forEach((request: any) => {
				if (request.requester.intraId != user.intraId)
					this.friendRequests.push(request);
			}
			);
		});

	}

	acceptFriendRequest(request: any) {
		this.userService
			.acceptFriendRequest(request.requester.intraId, request.requested.intraId)
			.subscribe();
		this.friendRequests = this.friendRequests.filter((friendRequest) => friendRequest.requester.intraId !== request.requester.intraId);
	}

	declineFriendRequest(request: any) {
		this.userService
			.declineFriendRequest(
				request.requester.intraId,
				request.requested.intraId
			)
			.subscribe();
		this.friendRequests = this.friendRequests.filter((friendRequest) => friendRequest.requester.intraId !== request.requester.intraId);
	}
	
}
