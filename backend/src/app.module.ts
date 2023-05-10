import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { AchievementModule } from './modules/achievement.module';
import { ChatModule } from './modules/chat.module';
import { LeaderboardModule } from './modules/leaderboard.module';
import { MatchModule } from './modules/match.module';
import { OnlineModule } from './modules/online.module';
import { PongModule } from './modules/pong.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [AuthModule, HttpModule,
		PrismaModule, JwtModule,
		PongModule, MatchModule, LeaderboardModule,
		AchievementModule,
		ChatModule,
		OnlineModule,
		MatchModule
	],
	controllers: [AppController],
	providers: [AppService, AuthService],
})
export class AppModule { }