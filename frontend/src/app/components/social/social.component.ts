import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Friend } from 'src/app/models/friend.model';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Message } from 'src/app/models/message.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterService } from 'src/app/services/route.service';

@Component({
	selector: 'app-social',
	templateUrl: './social.component.html',
	styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
	@ViewChild('chatMessages') chatMessages!: ElementRef;
	user!: User;
	messagesWithAvatars: any[] = [];
	profile!: User;
	tabs = [
		{ name: 'friends', function: () => this.selectFriendsTab()},
		{ name: 'chatrooms', function:() => this.selectChatroomsTab() },
		{ name: 'request', function: () => this.selectFriendRequestsTab() },
		{ name: 'blocked', function: () => this.selectBlockedFriendsTab() },
	];
	selectedTab: string = 'friends';
	selectFriendsTab() {
		if (this.selectedTab == 'friends') {
			this.router.navigate(['/social']);
			location.reload();
		}
		this.selectedTab = 'friends';
	}
	selectChatroomsTab() {
		if (this.selectedTab == 'chatrooms') {
			this.router.navigate(['/social']);
			location.reload();
		}
		this.selectedTab = 'chatrooms';
	}
	selectFriendRequestsTab() {
		this.selectedTab = 'request';
	}
	selectBlockedFriendsTab() {
		this.selectedTab = 'blocked';
	}

	constructor(
		public userService: UserService,
		private router: Router,
		public location: Location,
		public routerService: RouterService

	) {
		this.user = this.userService.getUser()!;
	}

	viewProfileUsername(username: string): void {
		if (username !== 'System') {
			this.userService.getIntraIdFromUsername(username).subscribe(
				(users: User) => {
					this.profile = users;
					this.router.navigate(['/profileid', this.profile.intraId]);
				},
				(error: any) => {
					console.log('Error:', error);
				}
			);
		}
	}
}