import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { PlayComponent } from './play/play.component';
import { ChatComponent } from './play/chat/chat.component';
import { GameComponent } from './play/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MainComponent } from './profile/main/main.component';
import { AchievementsComponent } from './profile/achievements/achievements.component';
import { ProfileNavigatorComponent } from './profile/profile-navigator/profile-navigator.component';
import { MatchHistoryComponent } from './profile/match-history/match-history.component';
import { FooterComponent } from './profile/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    PlayComponent,
    ChatComponent,
    GameComponent,
    ProfileComponent,
	HomeComponent,
 MainComponent,
 AchievementsComponent,
 ProfileNavigatorComponent,
 MatchHistoryComponent,
 FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule
  ],
  providers: [LoginComponent, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
