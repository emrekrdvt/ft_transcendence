import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StatusEvents } from 'src/models/sevents.model';
import { OnlineService } from 'src/services/online.service';

@WebSocketGateway({protocol: 'http', cors: {origin: 'http://localhost:4200'}})
export class OnlineGateway {
	@WebSocketServer()
	server: Server;

	constructor(private onlineService: OnlineService){}

	@SubscribeMessage(StatusEvents.connect)
	handleConnect(client: Socket, intraId: number): void {
		Logger.log(`Status Client connected: ${client.id}`);
		this.onlineService.goOnline(intraId, client.id);
		this.server.emit(StatusEvents.updateFriends);
	};

	@SubscribeMessage(StatusEvents.disconnect)
	handleDisconnect(client: Socket): void {
		Logger.log(`Status Client disconnected: ${client.id}`);
		this.onlineService.goOffline(client.id);
		this.server.emit(StatusEvents.updateFriends);
	};

	@SubscribeMessage(StatusEvents.logout)
	handleLogout(client: Socket, intraId: number): void {
		Logger.log(`Status Client logged out: ${client.id}`);
		this.onlineService.goOffline(client.id);
		this.server.emit(StatusEvents.updateFriends);
	};

	@SubscribeMessage(StatusEvents.ingame)
	handleIngame(client: Socket, intraId: number): void {
		Logger.log(`Status Client ingame: ${client.id}`);
		this.onlineService.goIngame(intraId);
		this.server.emit(StatusEvents.updateFriends);
	};

	@SubscribeMessage(StatusEvents.inchat)
	handleInchat(client: Socket, intraId: number): void {
		Logger.log(`Status Client inchat: ${client.id}`);
		this.onlineService.goInchat(intraId);
		this.server.emit(StatusEvents.updateFriends);
	}


	@SubscribeMessage(StatusEvents.getFriends)
	async handleGetFriends(client: Socket, intraId: number) {
		Logger.log(`Status Client getFriends: ${client.id}`);
		await this.onlineService.getFriends(intraId).then((friends) => {
			client.emit(StatusEvents.getFriends, friends);
		});
	}
};