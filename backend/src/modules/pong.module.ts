import { Module } from '@nestjs/common';
import { PongGateway } from '../gateways/pong.gateway';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';

@Module({
  providers: [PongGateway, PongService, MatchService],
})
export class PongModule {}
