import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { ProfileComponent } from './profile/profile.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
