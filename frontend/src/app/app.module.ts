import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PagesComponent } from './components/pages/pages.component';
import { PlayComponent } from './components/play/play.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RegisterService } from './services/register.service';
import { MainComponent } from './components/profile/main/main.component';
import { ProfileNavigatorComponent } from './components/profile/profile-navigator/profile-navigator.component';
import { RegisterComponent } from './components/register/register.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { DrawService } from './services/draw.service';
import { SocketService } from './services/socket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { GameComponent } from './components/play/game/game.component';
import { LobbyComponent } from './components/play/lobby/lobby.component';
import { LobbyService } from './services/lobby.service';
import { PlayerService } from './services/player.service';
import { GameStatsComponent } from './components/play/game-stats/game-stats.component';
import { GameService } from './services/game.service';
import { GameEndComponent } from './components/play/game-end/game-end.component';
import { MatchService } from './services/match.service';
import { MatchHistoryPageComponent } from './components/profile/match-history-page/match-history-page.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LeaderboardService } from './services/leaderboard.service';
import { WatchComponent } from './components/watch/watch.component';
import { AchievementsPageComponent } from './components/profile/achievements-page/achievements-page.component';
import { RouterService } from './services/route.service';
import { AchievementService } from './services/achievement.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PagesComponent,
		PlayComponent,
		ProfileComponent,
		HomeComponent,
		MainComponent,
		ProfileNavigatorComponent,
		RegisterComponent,
		MarketplaceComponent,
		LobbyComponent,
		GameComponent,
		GameStatsComponent,
		GameEndComponent,
		MatchHistoryPageComponent,
		LeaderboardComponent,
  WatchComponent,
  AchievementsPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SocketIoModule.forRoot(config)
	],
	providers: [AuthService,
			UserService, 
			RegisterService,
			DrawService, 
			SocketService, 
			LobbyService, 
			PlayerService, 
			GameService, 
			MatchService, 
			LeaderboardService, 
			RouterService,
			AchievementService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
