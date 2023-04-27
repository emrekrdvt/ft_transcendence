import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Seeker } from 'src/models/seeker.model';
import { LobbyService } from 'src/services/lobby.service';

@WebSocketGateway({
  protocol: 'http',
  cors: { origin: 'http://localhost:4200' },
})
export class LobbyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  afterInit() {
    Logger.log('Lobby gateway initialized');
  }

  @SubscribeMessage('findGame')
  handleConnection(client: Socket, seeker: Seeker) {
    if (seeker === undefined) return;
    Logger.log(`Client connected: ${client.id}`);
    seeker.clientId = client.id;
    if (this.lobbyService.getSeeker(seeker.clientId) !== undefined) return;
    this.lobbyService.addSeeker(seeker);
    client.broadcast.emit('seeker connected', client.id);
  }

  @SubscribeMessage('listSeekers')
  handleListSeekers(client: Socket) {
    const seekers = this.lobbyService.getSeekers();
    client.emit('seekers', seekers);
    client.broadcast.emit('seekers', seekers);
  }

  @SubscribeMessage('removeSeeker')
  handleRemoveSeeker(client: Socket, seeker: Seeker) {
    this.lobbyService.removeSeeker(seeker.clientId);
    client.broadcast.emit('seekers', this.lobbyService.getSeekers());
    client.emit('seekers', this.lobbyService.getSeekers());
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
    client.broadcast.emit('player disconnected', client.id);
    this.lobbyService.removeSeeker(client.id);
    this.server.emit('seekers', this.lobbyService.getSeekers());
  }
}
