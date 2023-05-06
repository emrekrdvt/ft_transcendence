import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


	constructor(public login: AuthService, public register: RegisterService) {
	}

	title = 'frontend';
}
