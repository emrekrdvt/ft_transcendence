import { Module } from '@nestjs/common';
import { PongGateway } from '../gateways/pong.gateway';
import { PongService } from '../services/pong.service';
import { MatchService } from '../services/match.service';
import { LobbyService } from 'src/services/lobby.service';
import { RatingService } from 'src/services/rating.service';
import { UserService } from 'src/auth/services/user.service';

@Module({
  providers: [PongGateway, PongService, MatchService, LobbyService, RatingService, UserService],
})
export class PongModule {}
