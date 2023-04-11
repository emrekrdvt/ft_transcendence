import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Location } from '@angular/common'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from '../services/user.service'
import { environment } from 'src/environment/environment'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})


export class LoginComponent {
	
	private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn$ = this._isLoggedIn$.asObservable();

	constructor(private location: Location, private auth: AuthService, private userService: UserService) {
		if (this.userService.getUser()) {
			this._isLoggedIn$.next(true);
		} else
			this._isLoggedIn$.next(false);
	}
		
	ngOnInit() {
		if (this.location.path().includes('code')) {
			const intraToken = this.location.path().split('=')[1];
			this.auth.authentication(environment.address, intraToken, this.auth.authenticateUser);
		}
	}

	signIn = () => {
		document.location.href = environment.link;
	}

}
