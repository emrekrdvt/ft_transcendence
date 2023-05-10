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
import { MatchmakingService } from '../services/matchmaking.service';
import { LobbyService } from '../services/lobby.service';
import { Player } from 'src/models/player.model';
import { Game } from 'src/models/game.model';


@WebSocketGateway({protocol: 'http', cors: {origin: 'http://localhost:4200'}})
export class PongGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
	@WebSocketServer()
	server: Server;
	constructor(
		private readonly pongService: PongService,
		private matchService: MatchmakingService,
		private lobbyService: LobbyService,
	) {}

	afterInit(server: Server) {
		Logger.log('Pong gateway initialized');
	}


	handleConnection(client: Socket) {
		Logger.log(`Game Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		Logger.log(`Game Client disconnected: ${client.id}`);
		this.lobbyService.removePlayer(client.id, this.lobbyService.getLobby('default'), 'default');
		this.lobbyService.removePlayer(client.id, this.lobbyService.getLobby('modded'), 'modded');
		this.server.emit('lobby', {lobby: this.lobbyService.getLobby('default'), type: 'default'});
		this.server.emit('lobby', {lobby: this.lobbyService.getLobby('modded'), type: 'modded'});
	}

	@SubscribeMessage(PongEvents.Join)
	handleJoin(client: Socket, data: {player: Player, type: string}) {
		Logger.log(`Client joined: ${client.id}`);
		if (this.lobbyService.getPlayer(client.id, this.lobbyService.getLobby(data.type)) != null)
			return;
		this.lobbyService.addPlayer(client.id, data.player, data.type);
		this.matchService.matchPlayers(data.type, this.lobbyService.getLobby(data.type), this.server, (id1: string, id2: string) => {
			this.lobbyService.removePlayer(id1, this.lobbyService.getLobby(data.type), data.type);
			this.lobbyService.removePlayer(id2, this.lobbyService.getLobby(data.type), data.type);
			const roomId = this.matchService.getGameByClientId(id1).id;
			const game: Game = this.matchService.getGameById(roomId);
			this.server.to(roomId).emit('game', game);
			this.pongService.startGame(game, this.server, roomId);
		});
		this.server.emit('lobby', { lobby: this.lobbyService.getLobby(data.type), type: data.type});
	}

	@SubscribeMessage(PongEvents.LeaveLobby)
	handleLeaveLobby(client: Socket, type: string) {
		this.lobbyService.removePlayer(client.id, this.lobbyService.getLobby(type), type);
		this.server.emit('lobby', { lobby: this.lobbyService.getLobby(type), type: type});
	};

	@SubscribeMessage(PongEvents.GetLobby)
	handleGetLobby(client: Socket, type: string)
	{
		client.emit('lobby', { lobby: this.lobbyService.getLobby(type), type: type});
	}

	@SubscribeMessage(PongEvents.MovePaddle)
	handleMovePaddle(client: Socket, player: Player) {
		this.pongService.changePlayerState(this.matchService.getGameByClientId(client.id), player, client, this.server);
	}

	@SubscribeMessage(PongEvents.Leave)
	handleLeave(client: Socket, roomId: string, type: string) {
		this.lobbyService.removePlayer(client.id, this.lobbyService.getLobby(type), type);
		client.leave(roomId);
		client.disconnect();
	};
}
