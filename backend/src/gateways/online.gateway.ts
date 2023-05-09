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
		Logger.log(`Client connected: ${client.id}`);
		this.server.emit(StatusEvents.connect, client.id);
		this.onlineService.goOnline(intraId, client.id);
	};

	@SubscribeMessage(StatusEvents.disconnect)
	handleDisconnect(client: Socket): void {
		Logger.log(`Client disconnected: ${client.id}`);
		this.server.emit(StatusEvents.disconnect, client.id);
		this.onlineService.goOffline(client.id);
	};

	@SubscribeMessage(StatusEvents.ingame)
	handleIngame(client: Socket, intraId: number): void {
		Logger.log(`Client ingame: ${client.id}`);
		this.server.emit(StatusEvents.ingame, client.id);
		this.onlineService.goIngame(intraId);
	};

	@SubscribeMessage(StatusEvents.inchat)
	handleInchat(client: Socket, intraId: number): void {
		Logger.log(`Client inchat: ${client.id}`);
		this.server.emit(StatusEvents.inchat, client.id);
		this.onlineService.goInchat(intraId);
	}

	@SubscribeMessage(StatusEvents.getFriends)
	handleGetFriends(client: Socket, intraId: number): void {
		Logger.log(`Client getFriends: ${client.id}`);
		client.emit(StatusEvents.getFriends, this.onlineService.getFriends(intraId));
	}
};