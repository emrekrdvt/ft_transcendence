import { Module } from '@nestjs/common';
import { PongGateway } from '../gateways/pong.gateway';
import { PongService } from '../services/pong.service';
import { MatchmakingService } from '../services/matchmaking.service';
import { LobbyService } from 'src/services/lobby.service';
import { RatingService } from 'src/services/rating.service';
import { UserService } from 'src/auth/services/user.service';
import { LevelService } from 'src/services/level.service';
import { BalanceService } from 'src/services/balance.service';

@Module({
  providers: [PongGateway, PongService, MatchmakingService, LobbyService, RatingService, UserService, LevelService, BalanceService],
})
export class PongModule {}
