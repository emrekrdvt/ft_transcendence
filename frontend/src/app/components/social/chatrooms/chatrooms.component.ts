import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Chatroom } from 'src/app/models/chatroom.model';
import { Message } from 'src/app/models/message.model';

@Component({
	selector: 'app-chatrooms',
	templateUrl: './chatrooms.component.html',
	styleUrls: ['./chatrooms.component.scss', '../social.component.scss']
})
export class ChatroomsComponent {

	chatroomName: string = '';
	chatroomPassword: string = '';
	chatOpen: boolean = false;
	chatrooms: Chatroom[] = [];
	selectedChatroom!: Chatroom;

	constructor(private chatService: ChatService, private userService: UserService) { }

	ngOnInit(): void {
		this.chatService.getRooms().subscribe((response) => {
			const chatrooms = Object.values(response);
			this.chatrooms = chatrooms;
		});
	};

	createChatroom(): void {
		const creator = this.userService.getUser()?.username!;
		const chatroomName = this.chatroomName.trim();
		if (!chatroomName.length) {
			this.chatroomName = '';
			this.chatroomPassword = '';
			return;
		}
		const existingChatroom = this.chatrooms.find((chatroom) => chatroom.name === chatroomName);
		if (existingChatroom) {
			alert(`A chatroom with the name "${chatroomName}" already exists.`);
			this.chatroomName = '';
			this.chatroomPassword = '';
			return;
		}
		const chatroom = {
			name: this.chatroomName,
			password: this.chatroomPassword,
			creator: creator,
		};
		this.chatrooms.push(chatroom);
		this.chatService.createChatRoom(chatroom);
		this.chatroomName = '';
		this.chatroomPassword = '';
	}

	selectChatroom(chatroom: Chatroom): void {
		this.selectedChatroom = chatroom;
		const myIntraID = this.userService.getUser()?.intraId
		const data = {
			name: chatroom.name,
			myIntraID: myIntraID,
		}
		this.chatService.canIJoin(this.selectedChatroom.name, data.myIntraID!).pipe().subscribe((canIJoin) => {
			if (canIJoin === true) {
				if (chatroom.password) {
					const enteredPassword = prompt("Lütfen odanın şifresini giriniz.");
					const checkCompare = this.chatService.comparePassword(this.selectedChatroom?.name!, enteredPassword!).subscribe((checkCompare) => {
						if (checkCompare) {
							this.chatService.joinChatRoom(data);
							this.chatService.joinChatSocket(data.name)
							this.chatService.getPublicChatRoomMessages(data.name).pipe().subscribe((messages) => {
								const chatroom: Chatroom = {
									name: data.name,
									messages: messages
								};
								this.selectedChatroom = chatroom;
								this.chatOpen = true;
							});
						}
						else {
							alert("Geçersiz şifre. Odaya giriş sağlayamadınız.");
							return;
						}
					});
				}
				else {
					this.chatService.joinChatRoom(data);
					this.chatService.joinChatSocket(data.name);
					this.chatService.getPublicChatRoomMessages(data.name).pipe().subscribe((messages) => {
						const chatroom: Chatroom = {
							name: data.name,
							messages: messages
						};
						this.selectedChatroom = chatroom;
						this.chatOpen = true;
					});
				}
			}
			else {
				alert("Bu odaya giriş yapmaya yetkiniz bulunmamaktadır.")
			}
		});
	}


	updateChannelName = (event: any) => {
		this.chatroomName = event.target.value;
	};

	updatePassword = (event: any) => {
		this.chatroomPassword = event.target.value;
	};

	
}
