import { Component } from '@angular/core';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

	constructor(private logInComponent: LoginComponent) {
	
	}

	signIn = () => {
		this.logInComponent.isLoggedIn = true;
	}
}
