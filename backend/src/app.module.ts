import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { LobbyGateway } from './gateways/lobby.gateway';
import { LobbyModule } from './modules/lobby.module';
import { PrismaModule } from './prisma/prisma.module';
import { LobbyService } from './services/lobby.service';

@Module({
	imports: [AuthModule, HttpModule, PrismaModule, JwtModule, LobbyModule],
	controllers: [AppController],
	providers: [AppService, AuthService, LobbyService],
})
export class AppModule {}
