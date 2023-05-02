import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PongEvents } from '../models/pevents.model';
import { PongMessage } from '../models/pmessages.model';
import { Logger } from '@nestjs/common';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';

@WebSocketGateway()
export class PongGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly pongService: PongService,
    private matchService: MatchService,
  ) {}

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
    this.pongService.removePlayer(client.id);
    client.broadcast.emit(PongEvents.PlayerLeft, client.id);
    client.emit(PongEvents.PlayerLeft, client.id);
  }

  @SubscribeMessage(PongEvents.Join)
  handleJoin(client: Socket, data: any) {
    Logger.log(`Client connected: ${client.id}`);
    this.pongService.addPlayer(client.id, data.rating);
    client.broadcast.emit(PongEvents.PlayerJoined, { clientId: client.id });
    client.emit(PongEvents.PlayerConfirmed, { clientId: client.id });
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
