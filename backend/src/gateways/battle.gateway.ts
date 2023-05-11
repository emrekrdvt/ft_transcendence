import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { BattleService } from 'src/services/battle.service';
import { Game } from 'src/models/game.model';


@WebSocketGateway({protocol: 'http', cors: {origin: 'http://localhost:4200'}})
@Injectable()
export class BattleGateway implements OnGatewayConnection, OnGatewayDisconnect  {
	@WebSocketServer() server: Server;
	
	constructor(private battleService: BattleService) {}

	AfterInit() {
		Logger.log('BattleGateway initialized');
	};

	@SubscribeMessage('connectBattle')
	handleConnection(client: Socket) {
		Logger.log('BattleGateway: connectBattle');
	};

	@SubscribeMessage('disconnectBattle')
	handleDisconnect(client: Socket) {
		Logger.log('BattleGateway: disconnectBattle');
		this.battleService.removeBattleRequest(client.id);
	};

	@SubscribeMessage('closeBattleRequests')
	handleCloseBattleRequests(client: Socket, payload: any) {
		Logger.log('BattleGateway: closeBattleRequests');
		const myID = payload.myID;
		client.emit('myRequests', this.battleService.removeBattleRequests(myID));
	};
	
	@SubscribeMessage('requestBattle')
	handleRequestBattle(client: Socket, payload: any) {	
		Logger.log('BattleGateway: requestBattle');
		const friendId = payload.friendId;
		const myID = payload.myID;
		if (this.battleService.isAlreadyRequested(friendId, myID) === true)
			return;
		client.broadcast.emit('myRequests', this.battleService.createBattleRequest(friendId, myID, client.id));
	};

	@SubscribeMessage('getMyRequests')
	handleGetMyRequests(client: Socket, payload: any) {
		Logger.log('BattleGateway: getMyRequests');
		const intraId = payload.intraId;
		client.emit('myRequests', this.battleService.getRequests(intraId));
	};

	@SubscribeMessage('acceptBattle')
	handleAcceptBattle(client: Socket, payload: any) {
		Logger.log('BattleGateway: acceptBattle');
		const id1 = payload.challanger.intraId;
		const id2 = payload.challenged.intraId;
		this.battleService.removeBattleRequests(id1);
		this.battleService.removeBattleRequests(id2);
		client.broadcast.emit('battleAccepted',payload.challanger);
		client.emit('battleAccepted', payload.challenged);
	}

	@SubscribeMessage('removeBattleRequest')
	handleRemoveBattleRequest(client: Socket, payload: any) {
		Logger.log('BattleGateway: removeBattleRequest');
		const clientId = payload.clientId;
		this.battleService.removeBattleRequest(clientId);
		client.emit('myRequests', this.battleService.getRequests(payload.myID));
	}
}