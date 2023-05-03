import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PongEvents } from '../models/pevents.model';
import { PongMessage } from '../models/pmessages.model';
import { Logger } from '@nestjs/common';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';
import { LobbyService } from '../services/lobby.service';

@WebSocketGateway({protocol: 'http', cors: {origin: 'http://localhost:4200'}})
export class PongGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
	@WebSocketServer()
	server: Server;
	constructor(
		private readonly pongService: PongService,
		private matchService: MatchService,
		private lobbyService: LobbyService,
	) {}

	afterInit(server: Server) {
		Logger.log('Pong gateway initialized');
	}

	handleConnection(client: Socket) {
		Logger.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		Logger.log(`Client disconnected: ${client.id}`);
		this.lobbyService.removePlayer(client.id);
		this.server.emit('lobby', this.lobbyService.getLobby());
	}

	@SubscribeMessage(PongEvents.Join)
	handleJoin(client: Socket, data: any) {
		Logger.log(`Client joined: ${client.id}`);
		if (this.lobbyService.getPlayer(client.id) != null)
			return;
		this.lobbyService.addPlayer(client.id, data);
		this.server.emit('lobby', this.lobbyService.getLobby());
	}

	@SubscribeMessage(PongEvents.GetLobby)
	handleGetLobby(client: Socket)
	{
		client.emit('lobby', this.lobbyService.getLobby());
	}

	@SubscribeMessage(PongEvents.MovePaddle)
	handleMovePaddle(client: Socket, message: PongMessage) {
	  // İletiyi diğer oyuncuya gönder
	}

	@SubscribeMessage(PongEvents.UpdateBall)
	handleUpdateBall(client: Socket, message: PongMessage) {
   	  // İletiyi diğer oyuncuya gönder
	}
}
