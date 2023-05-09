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
export class SocialComponent implements OnInit {
	@ViewChild('chatMessages') chatMessages!: ElementRef;
	friendUsername: string = '';
	friendIntraID: number = 0;
	chatroomName: string = '';
	chatroomPassword: string = '';
	blockedFriends: Friend[] = [];
	chatrooms: Chatroom[] = [];
	messages: Message[] = [];
	friendRequests: any[] = [];
	checkif: boolean = false;
	chatOpen: boolean = false;
	user!: User;
	selectedChatroom: Chatroom | null = null;
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
		private chatService: ChatService,
		private ngZone: NgZone,
		public userService: UserService,
		private cdRef: ChangeDetectorRef,
		private socket: Socket,
		private router: Router,
		public location: Location,
		public routerService: RouterService

	) {
		this.user = this.userService.getUser()!;
	}


	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	scrollToBottom(): void {
		if (this.chatMessages) {
			try {
				this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
			} catch (err) { }
		}
	}

	ngOnInit() {

	

		this.chatService.getMessageFromChannel().subscribe((message: { message: string, sender: string }) => {
			const roomName = this.selectedChatroom?.name;
			this.selectedChatroom?.messages!.push({
				content: message.message,
				sender: message.sender,
			});

		});


		this.chatService.getRooms().subscribe((response) => {
			const chatrooms = Object.values(response);
			console.log(chatrooms);
			this.chatrooms = chatrooms;
		});

		this.userService.getFriendRequests().subscribe((friendRequests) => {
			this.friendRequests = friendRequests;
		});

	
		this.userService.getBlockedUsers().subscribe((blocked) => {
			this.blockedFriends = blocked;
		});	
	}

	selectTab(tab: 'friends' | 'chatrooms' | 'blocked'): void {
		this.selectedTab = tab;
	}

	sendFriendRequest(): void {
		this.userService
			.getIntraIdFromUsername(this.friendUsername)
			.subscribe((friendUsername) => {
				const friendInfo = friendUsername;
				this.postRequest(friendInfo.intraId, 0);
			});
		this.friendUsername = '';
		this.ngZone.run(() => { });
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

	



	declineFriendRequest(request: any) {
		this.userService
			.declineFriendRequest(
				request.requester.intraId,
				request.requested.intraId
			)
			.subscribe();
		this.ngZone.run(() => { });
	}

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
		console.log(this.selectedChatroom);
		const myIntraID = this.userService.getUser()?.intraId
		const data = {
			name: chatroom.name,
			myIntraID: myIntraID,
		}
		this.chatService.canIJoin(this.selectedChatroom.name, data.myIntraID!).pipe().subscribe((canIJoin) => {
			console.log(canIJoin);
			if (canIJoin === true) {
				if (chatroom.password) {
					const enteredPassword = prompt("Lütfen odanın şifresini giriniz.");
					const checkCompare = this.chatService.comparePassword(this.selectedChatroom?.name!, enteredPassword!).subscribe((checkCompare) => {
						if (checkCompare) {
							this.chatOpen = true;
							this.checkif = true;
							this.chatService.joinChatRoom(data);
							this.chatService.joinChatSocket(data.name)
							this.chatService.getPublicChatRoomMessages(data.name).pipe().subscribe((messages) => {
								const chatroom: Chatroom = {
									name: data.name,
									messages: messages
								};
								this.selectedChatroom = chatroom;
								console.log(this.selectedChatroom)
								console.log(chatroom)
							});
						}
						else {
							alert("Geçersiz şifre. Odaya giriş sağlayamadınız.");
							return;
						}
					});
				}
				else {
					this.chatOpen = true;
					this.checkif = true;
					this.chatService.joinChatRoom(data);
					this.chatService.joinChatSocket(data.name);
					this.chatService.getPublicChatRoomMessages(data.name).pipe().subscribe((messages) => {
						const chatroom: Chatroom = {
							name: data.name,
							messages: messages
						};
						this.selectedChatroom = chatroom;
						console.log(this.selectedChatroom)
						console.log(chatroom)
					});
				}
			}
			else {
				alert("Bu odaya giriş yapmaya yetkiniz bulunmamaktadır.")
			}
		});
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