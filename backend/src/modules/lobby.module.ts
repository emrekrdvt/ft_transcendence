import { Module } from '@nestjs/common';
import { LobbyGateway } from '../gateways/lobby.gateway';
import { LobbyService } from '../services/lobby.service';

@Module({
	providers: [LobbyGateway, LobbyService],
})
export class LobbyModule {}