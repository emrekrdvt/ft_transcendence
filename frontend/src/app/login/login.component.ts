import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	isLoggedIn = false;
	token = '';

	setToken = (token: string) => {
		this.token = token;
		this.isLoggedIn = true;
	}
}
