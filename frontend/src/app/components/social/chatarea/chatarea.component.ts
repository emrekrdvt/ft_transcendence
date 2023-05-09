import { Component } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Friend } from 'src/app/models/friend.model';
import { Message } from 'src/app/models/message.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { OnInit } from '@angular/core';
import { FriendsComponent } from '../friends/friends.component';
import { ChatroomsComponent } from '../chatrooms/chatrooms.component';

@Component({
	selector: 'app-chatarea',
	templateUrl: './chatarea.component.html',
	styleUrls: ['./chatarea.component.scss']
})
export class ChatareaComponent implements OnInit {

	selectedFriend !: Friend;
	selectedChatroom !: Chatroom;
	messages: Message[] = [];
	user: User = this.userService.getUser()!;
	constructor(public userService: UserService, private chatService: ChatService, private friendsComponent: FriendsComponent,
		private chatRoomsComponent: ChatroomsComponent) { }

	ngOnInit(): void {
		const el = document.getElementById('friends');
		if (el) {
			this.selectedFriend = this.friendsComponent.selectedFriend!;
			this.friendsComponent.chat(this.selectedFriend, (message: any) => {
				this.messages.push({ sender: message.sender.username, content: message.text });
			});
			this.chatService.getMessageFromChat().subscribe((message: { message: string, sender: string }) => {
				this.messages.push({
					content: message.message,
					sender: message.sender,
				});
			});
		};
		
	};

	showAlert(content: string): void {
		const newlo = content.split(' ')[0].trim();
		if (newlo == this.user.username) {
			const result = confirm('Odadan Çıkarıldınız. Devam etmek istiyor musunuz?');
			if (result) {
				location.reload();
			}
		}
	}

	sendFriendFunc(message: Message): void {
		const sender = message.sender;
		const receiver = message.receiver;
		const senderIntra = message.senderID
		this.chatService.findRoomID(sender, receiver!).subscribe((response) => {
			const roomID = response;
			this.chatService.joinRoom(roomID!);
			this.chatService.sendMessageToFriend(message, roomID!);
			this.messages.push(message);
		});
	}

	sendChatRoom(message: Message): void {
		const currentUser = this.userService.getUser()?.username;
		const roomName = this.selectedChatroom?.name;
		const updateMsg: Message = {
			sender: message.sender,
			content: message.content,
			senderID: message.senderID,
			roomName: roomName,
		};
		this.chatService.sendMessageToChannel(updateMsg);
	}

	sendMessage(content: string) {

		if (content.trim() !== '') {
			const username: string = this.userService.getUser()?.username!;
			const receiverName: string = this.selectedFriend?.username!;
			if (!this.selectedFriend && !this.selectedChatroom) {
				return;
			}

			if (this.selectedFriend) {
				const myIntraID = this.userService.getUser()?.intraId;
				const message: Message = {
					sender: username,
					receiver: receiverName,
					content: content,
					senderID: myIntraID,
				};
				this.sendFriendFunc(message);
			}
			else if (this.selectedChatroom) {
				const message: Message = {
					sender: username,
					content: content,
					senderID: this.userService.getUser()?.intraId,
				};
				const chatroom: Chatroom = {
					name: this.selectedChatroom.name,
					messages: [message],
				}
				this.sendChatRoom(message);
			}
		}
	}
}
