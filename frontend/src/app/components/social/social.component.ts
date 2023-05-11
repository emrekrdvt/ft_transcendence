import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterService } from 'src/app/services/route.service';
import { BattleService } from 'src/app/services/battle.service';

@Component({
	selector: 'app-social',
	templateUrl: './social.component.html',
	styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
	@ViewChild('chatMessages') chatMessages!: ElementRef;
	isChallenged: boolean = false;
	user!: User;
	messagesWithAvatars: any[] = [];
	battleRequests: any[] = [];
	requests: any[] = [];
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

	ngOnInit() {
		const user: User = this.userService.getUser()!;
		this.socketService.listenToEvent('myRequests').subscribe((request: any) => {
			if (request.myID === undefined)
				return;
			this.battleService.pushRequest(request);
				this.battleRequests = this.battleService.getRequests();
				this.battleRequests.forEach((request: any) => {
					this.userService.getAnUser(request.myID).subscribe((user: User) => {
						this.requests.push({challanger: user, challenged: this.user})
					});
				});
				
			this.isChallenged = true;
		});
		this.socketService.listenToEvent('battleAccepted').subscribe((request: any) => {
			this.router.navigate(['/play']);
			this.socketService.sendEvent('join', { player: request, type: 'modded'});
		});
	}

	constructor(
		public userService: UserService,
		private router: Router,
		public location: Location,
		public routerService: RouterService,
		private socketService: SocketService,
		public battleService: BattleService

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