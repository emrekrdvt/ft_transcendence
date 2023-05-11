import { Module } from "@nestjs/common";
import { BattleService } from "../services/battle.service";
import { BattleGateway } from "../gateways/battle.gateway";
import { PongModule } from "./pong.module";
import { MatchmakingService } from "src/services/matchmaking.service";

@Module({
	imports: [ PongModule ],
	providers: [ BattleService, BattleGateway, MatchmakingService],
})
export class BattleModule {}