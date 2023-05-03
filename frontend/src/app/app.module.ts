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
import { AchievementsComponent } from './components/profile/achievements/achievements.component';
import { ProfileNavigatorComponent } from './components/profile/profile-navigator/profile-navigator.component';
import { MatchHistoryComponent } from './components/profile/match-history/match-history.component';
import { FooterComponent } from './components/profile/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { DrawService } from './services/draw.service';
import { SocketService } from './services/socket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { GameComponent } from './components/play/game/game.component';
import { LobbyComponent } from './components/play/lobby/lobby.component';
import { LobbyService } from './services/lobby.service';
import { PlayerService } from './services/player.service';

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
		AchievementsComponent,
		ProfileNavigatorComponent,
		MatchHistoryComponent,
		FooterComponent,
		RegisterComponent,
		MarketplaceComponent,
		LobbyComponent,
  GameComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SocketIoModule.forRoot(config)
	],
	providers: [AuthService, UserService, RegisterService, DrawService, SocketService, LobbyService, PlayerService],
	bootstrap: [AppComponent]
})
export class AppModule { }
