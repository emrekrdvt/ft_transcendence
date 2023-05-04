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
import { Logger } from '@nestjs/common';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';
import { LobbyService } from '../services/lobby.service';
import { Match } from '../models/match.model';
import { Player } from 'src/models/player.model';


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
		this.matchService.matchPlayers(this.lobbyService.getLobby(), this.server, (id1: string, id2: string) => {
			this.lobbyService.removePlayer(id1);
			this.lobbyService.removePlayer(id2);
			const roomId = this.matchService.getMatchByClientId(id1).id;
			const match: Match = this.matchService.getMatchById(roomId);
			this.server.to(roomId).emit('match', match);
			this.pongService.startMatch(match, this.server, roomId);
		});
		this.server.emit('lobby', this.lobbyService.getLobby());
	}

	@SubscribeMessage(PongEvents.GetLobby)
	handleGetLobby(client: Socket)
	{
		client.emit('lobby', this.lobbyService.getLobby());
	}

	@SubscribeMessage(PongEvents.MovePaddle)
	handleMovePaddle(client: Socket, player: Player) {
		const match: Match = this.matchService.getMatchByClientId(client.id);
		if (match == null)
			return;
		if (match.player1.clientId === client.id) {
			match.player1.up = player.up;
			match.player1.down = player.down;
		}
		else if (match.player2.clientId === client.id) {
			match.player2.up = player.up;
			match.player2.down = player.down;
		};
		console.log(player.up, player.down);
		console.log(match.player1.up, match.player1.down, match.player2.up, match.player2.down);
		this.server.to(match.id).emit('match', match);
	}
}
