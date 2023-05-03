import { Module } from '@nestjs/common';
import { PongGateway } from '../gateways/pong.gateway';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';
import { LobbyService } from 'src/services/lobby.service';

@Module({
  providers: [PongGateway, PongService, MatchService, LobbyService],
})
export class PongModule {}
