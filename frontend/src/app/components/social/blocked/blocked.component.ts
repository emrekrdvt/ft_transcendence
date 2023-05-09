import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-blocked',
	templateUrl: './blocked.component.html',
	styleUrls: ['./blocked.component.scss', '../social.component.scss']
})
export class BlockedComponent {
	blockedFriends: Friend[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getBlockedUsers().subscribe((blocked) => {
			this.blockedFriends = blocked;
		});	
	};

	removeBlock(friend: Friend): void {
		this.userService.removeBlock(friend.username).subscribe();
		this.blockedFriends = this.blockedFriends.filter((blockedFriend) => blockedFriend.username !== friend.username);
	}

}
