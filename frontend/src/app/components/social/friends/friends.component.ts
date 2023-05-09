import { Component } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';
import { SocialComponent } from '../social.component';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.component.html',
	styleUrls: ['./friends.component.scss', '../social.component.scss']
})
export class FriendsComponent implements OnInit {

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
		private social: SocialComponent) {}

	ngOnInit(): void {
		this.userService.getFriends().subscribe((friends) => {
			this.friends = friends;
		});
	};
	

	acceptFriendRequest(request: any) {
		this.friends.push({ username: request.requester.username });
		this.userService
			.acceptFriendRequest(request.requester.intraId, request.requested.intraId)
			.subscribe();
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
	}

	blockFriend(friend: Friend): void {
		this.userService.blockUser(friend.username).subscribe();
	}
	removeBlock(friend: Friend): void {
		this.userService.removeBlock(friend.username).subscribe();
	}

	viewProfile(friend: Friend): void {
		this.router.navigate(['/profileid', friend.intraId]);
	}

}
