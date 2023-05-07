import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayComponent } from './components/play/play.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatchHistoryPageComponent } from './components/profile/match-history-page/match-history-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'play',
		component: PlayComponent, canActivate: [AuthGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent, canActivate: [AuthGuard]
	},
	{
		path: 'home',
		component: HomeComponent, canActivate: [AuthGuard]
	},
	{
		path: 'marketplace',
		component: MarketplaceComponent, canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'history',
		component: MatchHistoryPageComponent, canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
