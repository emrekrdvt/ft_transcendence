import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { User } from 'src/app/models/user.model';
import { Status } from 'src/app/models/status.model';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss', '../social.component.scss']
})

export class FriendsComponent implements OnInit {
	friendUsername: string = '';
	friendIntraID: number = 0;
	friends: Friend[] = [];
	messages: Message[] = [];
	selectedFriend: Friend | null = null;
	chatOpen: boolean = false;
	selectedChatroom: Chatroom | null = null;
	buttons = [
		{ name: '💬', function: (friend: Friend) => this.selectFriend(friend)},
		{ name: '❌', function: (friend: Friend) => this.removeFriend(friend)},
		{ name: '🚫', function: (friend: Friend) => this.blockFriend(friend)},
		{ name: '👤', function: (friend: Friend) => this.viewProfile(friend)},
	];
	
	constructor(private userService: UserService,
		private chatService: ChatService,
		private router: Router,
		private socketService: SocketService) {}

	ngOnInit() {
		const user: User = this.userService.getUser()!;
		this.socketService.listenToEvent('updateFriends').subscribe(() => {
			this.socketService.sendEvent('getFriends', user.intraId);
		});
		this.userService.getFriends().subscribe((friends) => {
			this.friends = friends;
		});
		this.socketService.sendEvent('status_connect', user.intraId);
		this.socketService.sendEvent('inchat', user.intraId);
		//wait 1ms for the server to update the status
		setTimeout(() => {
			this.socketService.sendEvent('getFriends', user.intraId);
		}, 100);
		this.socketService.listenToEvent('getFriends').subscribe((friendsStatus: Status[]) => {
			this.friends.forEach((friend) => {
				friendsStatus.forEach((friendStatus) => {
					if (friend.intraId === friendStatus.intraId) {
						friend.status = friendStatus;
					}
				});
			});
		});
		this.socketService.sendEvent('getFriends', user.intraId);
		
	};

	getStatus = (friendStatus: Status | undefined) => {
		if (!friendStatus)
			return;
		if (friendStatus.chat) {
			return 'In Chat';
		} else if (friendStatus.ingame) {
			return 'In Game';
		} else if (friendStatus.online) {
			return 'Online';
		}
		return 'Offline';
	}

	getColor = (friendStatus: Status | undefined) => {
		if (!friendStatus)
			return;
		if (friendStatus.chat) {
			return 'chat';
		} else if (friendStatus.ingame) {
			return 'game';
		} else if (friendStatus.online) {
			return 'online';
		}
		return 'offline';
	}

	selectFriend(friend: Friend) {
		this.selectedFriend = friend;
		this.selectedChatroom = null;
		this.chatOpen = true;
		const myIntraID = this.userService.getUser()?.username;
		const friendIntraID = friend.username;
		const roomID = this.chatService.findRoomID(myIntraID!, friendIntraID!).subscribe((roomID) => {
			const convertID = Object.values(roomID)[0];
			this.chatOpen = true;
			this.chatService.joinRoom(convertID);
		});
	}

	chat(friend: Friend, f: Function): void  {
		const myIntraID = this.userService.getUser()?.intraId;
		const friendId = friend.intraId;
		const sender = this.userService.getUser()?.username;
		this.chatService.findRoomID(sender!, friend.username!).subscribe((response) => {
			const roomID = Object.values(response)[0];
			this.chatService.getChatRoomMessages(roomID!).subscribe((chatMessages) => {
				chatMessages.forEach((message) => {
					f(message);
				});
			});
		});
		this.chatService.createRoom(friendId!, myIntraID!);
	}


	removeFriend(friend: Friend): void {
		this.userService.removeFriend(friend.username).subscribe();
		this.friends = this.friends.filter((friend) => friend.username !== friend.username);
	}

	blockFriend(friend: Friend): void {
		this.userService.blockUser(friend.username).subscribe();
		this.friends = this.friends.filter((friend) => friend.username !== friend.username);
	}

	viewProfile(friend: Friend): void {
		this.router.navigate(['/profileid', friend.intraId]);
	}

	sendFriendRequest(): void {
		this.userService
			.getIntraIdFromUsername(this.friendUsername)
			.subscribe((friendUsername) => {
				const friendInfo = friendUsername;
				console.log(friendInfo);
				this.postRequest(friendInfo.intraId, 0);
			});
		this.friendUsername = '';
	}

	postRequest(friendID: number, myIntraID: number): void {
		const asd = this.userService.getUser()?.intraId;
		myIntraID = asd!;
		this.friendIntraID = friendID;
		this.userService
			.sendFriendRequest(myIntraID, friendID)
			.subscribe((friendRequest: any) => {
				const friendInfo = friendRequest;
				console.log(friendInfo);
			});
	}

	updateFriendName(event: any): void {
		this.friendUsername = event.target.value;
	};
}
