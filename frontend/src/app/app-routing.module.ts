import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {SocialComponent} from "./social/social.component";
import {PlayComponent} from "./play/play.component";
import {SettingsComponent} from "./settings/settings.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "social",
    component: SocialComponent
  },
  {
    path: "play",
    component: PlayComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "leaderboard",
    component: LeaderboardComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
