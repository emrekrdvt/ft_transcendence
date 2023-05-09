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
		}
		else
		{
			this.selectedChatroom = this.chatRoomsComponent.selectedChatroom!;
			this.chatService.getMessageFromChannel().subscribe((message: { message: string, sender: string }) => {
				this.selectedChatroom.messages!.push({
					content: message.message,
					sender: message.sender,
				});
			});
		}
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

		const command = updateMsg.content.split(' ')[0];
		const time = updateMsg.content.split(' ')[2];
		const commandContent = updateMsg.content.split(' ')[1];

		if (command === '/help') {
			alert('Commands: \n /kick <username> <time> \n /ban <username> <time> \n /unban <username> \n /setMod <username> \n /unsetMod <username> \n /mute <username> <time> \n /unmute <username> \n /pass <password> \n /deletePass <password>')
			return;
		}
		if (command === '/kick' || command === '/ban' || command === '/unban' || command === '/setMod' || command === '/unsetMod' || command === '/mute' || command === '/unmute') {
			console.log(command, commandContent, updateMsg.sender, this.selectedChatroom?.name!);
			this.chatService.executeCommand(command, commandContent, updateMsg.sender, this.selectedChatroom?.name!, parseInt(time));
		}
		else if (command === '/pass') {
			const password = updateMsg.content.split(' ')[1];
			this.chatService.changePassword(this.selectedChatroom?.name!, password, updateMsg.sender);

		}
		else if (command === '/deletePass') {
			const password = updateMsg.content.split(' ')[1];
			this.chatService.destroyPassWord(this.selectedChatroom?.name!, password, updateMsg.sender);
		}
		else {
			const checkMute = this.chatService.canIchat(this.selectedChatroom?.name!, updateMsg.sender).subscribe((response) => {
				console.log(response)
				if (response === true) {
					this.chatService.sendMessageToChannel(updateMsg);
					this.selectedChatroom?.messages!.push(updateMsg);
				}
				else {
					alert("You are muted")
				}
			});

		}
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
				this.sendChatRoom(message);
			}
		}
	}
}
