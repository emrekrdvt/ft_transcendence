import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterNavigatorComponent} from "./footer-navigator/footer-navigator.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileHeaderComponent} from "./profile/profile-header/profile-header.component";
import {ProfileStatsComponent} from "./profile/profile-stats/profile-stats.component";
import {ProfileAchievementsComponent} from "./profile/profile-achievements/profile-achievements.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, FooterNavigatorComponent, LoginPageComponent, ProfileComponent, ProfileHeaderComponent, ProfileStatsComponent, ProfileAchievementsComponent,],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
    FooterNavigatorComponent  
  ]
})
export class AppModule {}
