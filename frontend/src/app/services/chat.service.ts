import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from 'src/environment/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private _events = new EventEmitter<string>();

	get events(): EventEmitter<string> {
		return this._events;
	}

	private apiUrl = environment.address + '/chat';

	constructor(private socket: Socket, private http: HttpClient, private userService: UserService) { }

	createRoom(friendId: number, myIntraID: number) {
		const room = this.socket.emit('createRoom', { friendId, myIntraID });
		return room;
	}

	async createChatRoom(data: any) {

		this.socket.emit('createChatRoom', data);
	}

	sendMessageToFriend(data: any, roomID: any) {

		const updateMessage = {
			roomID: roomID[0],
			message: data.content,
			sender: data.senderID,
			receiver: data.receiver,
		}
		this.socket.emit('sendMessageToFriend', updateMessage);
	}

	sendMessageToChannel(message: Message): Observable<Message> {
		this.socket.emit('sendMessageToChannel', message);
		return this.socket.fromEvent<Message>('newChannelMsg');
	}

	getMessageFromChat(): Observable<{ message: string, sender: string }> {
		return this.socket.fromEvent<{ message: string, sender: string }>('newMessage');
	}

	getMessageFromChannel(): Observable<{ message: string, sender: string }> {
		return this.socket.fromEvent<{ message: string, sender: string }>('newChannelMsg');
	}

	joinRoom(roomID: any) {
		this.socket.emit('joinRoom', roomID);
	}

	leaveRoom(roomID: any) {
		this.socket.emit('leaveRoom', roomID);
	}

	joinChatSocket(data: any) {

		this.socket.emit('joinChatRoom', data);
	}

	leaveChatSocket(data: any) {
		this.socket.emit('leaveChatRoom', data);
	}

	// command gelen komut - message.sender da kimin gönderdiği - roomName de hangi odada - commandContent de komutun içeriği
	executeCommand(command: string, commandContent: any, sender: string, roomName: string, time: any) {
		console.log("executeCommand", command, commandContent, sender, roomName);
		const senderName = sender;
		const whos = commandContent.split(' ')[0];
		switch (command) {
			case '/kick':
				{
					if (whos === senderName) {
						break;
					}
					else {
						this.socket.emit('kickUser', { roomName, whos, senderName });
						break;
					}
				}
			case '/ban':
				{
					if (whos === senderName) {
						return alert("You can't ban yourself  :D  why you want to do that ? ");
						break;
					}
					else {
						this.socket.emit('banUser', { roomName, whos, senderName, time });
						break;
					}
				}
			case '/unban':
				{
					this.unbanUser(roomName, whos, senderName);
					break;
				}
			case '/setMod':
				{
					if (whos === senderName) {
						return alert("You can't set yourself as moderator  :D  why you want to do that ? ");
						break;
					}
					else {
						console.log("setMod", roomName, whos)
						this.setMod(roomName, whos, senderName);
						break;
					}
				}
			case '/unsetMod':
				{
					if (whos === senderName) {
						return alert("You can't unset yourself as moderator  :D  why you want to do that ? ");
						break;
					}
					else {
						this.unsetMod(roomName, whos, senderName);
						break;
					}
				}
			case '/mute':
				{
					if (whos === senderName) {
						return alert("You can't mute yourself  :D  why you want to do that ? ");
						break;
					}
					else {
						this.muteUser(roomName, whos, senderName, time);
						break;
					}
				}
			case '/unmute':
				{
					if (whos === senderName) {
						return alert("You can't unmute yourself  :D  why you want to do that ? ");
						break;
					}
					else {
						this.unmuteUser(roomName, whos, senderName);
						break;
					}
				}
		}
	}

	findRoomID(sender: string, receiver: string) {
		return this.http.get(`${this.apiUrl}/${sender}/${receiver}/findRoomID`)
	}

	findChatRoom(roomID: string) {
		const name = roomID.toString();
		return this.http.get(`${this.apiUrl}/${name}/findChatRoom`).subscribe(response => {
			console.log(response);
		});
	}

	getRooms() {
		return this.http.get(`${this.apiUrl}/getRooms`);
	}

	getChatRoomMessages(roomID: string): Observable<Message[]> {
		return this.http.get<Message[]>(`${this.apiUrl}/${roomID}/getMessages`);
	}

	getPublicChatRoomMessages(roomID: string): Observable<Message[]> {
		return this.http.get<Message[]>(`${this.apiUrl}/${roomID}/getPublicMessages`);
	}

	joinChatRoom(data: any) {
		const roomName = Object.values(data)[0];
		const intraID = Object.values(data)[1];
		return this.http.post(`${this.apiUrl}/join-chat-room`, { roomID: roomName, intraID: intraID });
	}

	leaveChatRoom(data: any) {
		const roomName = Object.values(data)[0];
		const intraID = Object.values(data)[1];;
		return this.http.post(`${this.apiUrl}/leave-chat-room`, { roomID: roomName, intraID: intraID });
	}

	canIJoin(roomName: string, intraID: number): Observable<boolean> {
		return this.http.get<boolean>(`${this.apiUrl}/${roomName}/${intraID}/canIJoin`)
	}

	getBanEndTime(roomName: string, intraID: number): Observable<number> {
		return this.http.get<number>(`${this.apiUrl}/${roomName}/${intraID}/getBanEndTime`)
	}

	setMod(roomID: string, intraID: string, sender: string) {
		return this.http.post(`${this.apiUrl}/set-mod`, { roomID, intraID, sender })
			.subscribe(response => {
				console.log(response);
			});
	}

	unsetMod(roomID: string, unsetMod: string, sender: string) {
		console.log("unsetMod", roomID, unsetMod);
		return this.http.post(`${this.apiUrl}/unset-mod`, { roomID, unsetMod, sender })
			.subscribe(response => {
				console.log(response);
			});
	}

	unbanUser(roomID: string, whos: string, sender: string) {
		return this.http.post(`${this.apiUrl}/unban`, { roomID, whos, sender })
			.subscribe(response => {
				console.log(response);
			});
	}

	muteUser(roomName: string, whos: string, sender: string, time: number) {
		return this.http.post(`${this.apiUrl}/mute`, { roomName, whos, sender, time })
			.subscribe(response => {
				console.log(response);
			});
	}

	unmuteUser(roomName: string, whos: string, sender: string) {
		return this.http.post(`${this.apiUrl}/unmute`, { roomName, whos, sender })
			.subscribe(response => {
				console.log(response);
			});
	}

	canIchat(roomName: string, senderName: string): Observable<boolean> {
		return this.http.get<boolean>(`${this.apiUrl}/${roomName}/${senderName}/canIchat`)
	}

	comparePassword(roomName: string, password: string): Observable<boolean> {
		return this.http.get<boolean>(`${this.apiUrl}/comparePassword/${roomName}/${password}`)
	}

	changePassword(roomName: string, password: string, senderName: string) {
		return this.http.post(`${this.apiUrl}/changePassword`, { roomName, password, senderName })
			.subscribe(response => {
				console.log(response);
			});
	}

	destroyPassWord(roomName: string, password: string, senderName: string) {
		console.log("destroyPassWord", roomName, password, senderName)
		return this.http.post(`${this.apiUrl}/destroyPass`, { roomName, password, senderName }).subscribe(response => {
			console.log(response);
		}
		);
	}
}