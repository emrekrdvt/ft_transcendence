import { Injectable } from '@nestjs/common';
import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';

@WebSocketGateway({
	cors: { origin: ['http://localhost:4200'] },
})

@Injectable()
export class ChatGateway {

	constructor(private chatService: ChatService) { }

	@WebSocketServer() wss: Server;

	@SubscribeMessage('createRoom')
	handleMessage(client: Socket, payload: any) {
		const friendId = payload.friendId;
		const myID = payload.myIntraID;
		this.chatService.createRoom(friendId, myID).then((room) => {
			this.wss.to(client.id).emit('createRoom', room);
		});
	}

	@SubscribeMessage('createChatRoom')
	handleCreateChatRoom(client: Socket, payload: any) {
		const creator = payload.creator;
		const roomName = payload.name;
		const password = payload.password;
		if (password == "") {
			try {
				this.chatService
					.createChatRoom(creator, roomName, 0)
					.then((room) => {
						this.wss.to(client.id).emit('createChatRoom', room);
					});
			}
			catch (error) {
				console.log(error);
			}
		}
		else {
			try {
				this.chatService
					.createChatRoom(creator, roomName, password)
					.then((room) => {
						this.wss.to(client.id).emit('createChatRoom', room);
					});
			}
			catch (error) {
				console.log(error);
			}
		}
	}

	@SubscribeMessage('joinChatRoom')
	handleJoinChatRoom(client: Socket, payload: any) {
		client.join(payload);
	}

	@SubscribeMessage('leaveChatRoom')
	handleLeaveChatRoom(client: Socket, payload: any) {
		client.leave(payload);
	}

	@SubscribeMessage('sendMessageToChannel')
	async handleSendMessageToChannel(client: Socket, payload: any) {
		const roomName = payload.roomName;
		const message = payload.content;
		const senderId = payload.senderID;
		const senderName = payload.sender;
		this.chatService.sendMessageToChannel(roomName, message, senderId).then((asd) => {
			client.to(roomName).emit('channelMsg', asd);
		});
		client.broadcast.to(roomName).emit('newChannelMsg', { message: message, sender: senderName });
	}

	@SubscribeMessage('sendMessageToFriend')
	async handleSendMessageToFriend(client: Socket, payload: any) {
		const roomID: string = payload.roomID;
		const message: string = payload.message;
		const senderId: number = payload.sender;
		const senderName = await this.chatService.getUsernameFromID(senderId);
		console.log("senderName", senderName);
		this.chatService.sendMessageToFriend(roomID, message, senderId)
			.then((message) => {
				client.to(roomID).emit('sendMessageToFriend', message);
			});
		client.join(roomID);
		client.broadcast.to(roomID).emit('newMessage', { message: message, sender: senderName });
	}

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(client: Socket, payload: any) {
		client.join(payload);
	}

	@SubscribeMessage('leaveRoom')
	async handleLeaveRoom(client: Socket, payload: any) {
		console.log("leaveRoom", payload)
		client.leave(payload);
	}

	@SubscribeMessage('kickUser')
	async handleKickUser(client: Socket, payload: any) {
		const roomName = payload.roomName;
		const whos = payload.whos;
		const senderName = payload.senderName;


		this.chatService.kickUser(roomName, whos, senderName).then((res) => {
			client.to(roomName).emit('kickUser', res);
		}).then(() => {
			client.broadcast.to(roomName).emit('newChannelMsg', { "message": whos + " kicked by " + senderName, "sender": "System" });
		});
	}

	@SubscribeMessage('banUser')
	async handleBanUser(client: Socket, payload: any) {
		console.log("banUser", payload);
		const roomName = payload.roomName;
		const whos = payload.whos;
		const senderName = payload.senderName;
		const banTime = payload.time;

		this.chatService.banUser(roomName, whos, senderName, banTime).then((res) => {
			client.broadcast.to(roomName).emit('newChannelMsg', { "message": whos + " banned by " + senderName, "sender": "System" });
		});
	}

	@SubscribeMessage('chatClosed')
	async handleChatClosed(client: Socket, payload: any) {
		const roomName = payload.roomName;
		const whos = payload.whos
		client.to(client.id).emit('chatClosed', whos);
	}
}