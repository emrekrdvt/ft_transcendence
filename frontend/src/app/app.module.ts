import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignOutComponent } from './login/sign-out/sign-out.component';
import { PagesComponent } from './login/sign-out/pages/pages.component';
import { PlayComponent } from './play/play.component';
import { ChatComponent } from './chat/chat.component';
import { GameComponent } from './play/game/game.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    SignOutComponent,
    PagesComponent,
    PlayComponent,
    ChatComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
