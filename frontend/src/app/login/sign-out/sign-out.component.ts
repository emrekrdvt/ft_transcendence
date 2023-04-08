import { Component } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent {

	constructor(private logInComponent: LoginComponent) {}

	signOut = () => {
		this.logInComponent.isLoggedIn = false;
	}
}
