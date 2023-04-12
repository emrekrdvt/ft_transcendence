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
	

	constructor(private location: Location, private auth: AuthService, private userService: UserService) {
	}
		
	ngOnInit() {
		if (localStorage.getItem('user')) {
			return;
		}	
		if (this.location.path().includes('code')) {
			const intraToken = this.location.path().split('=')[1];
			this.auth.authentication(environment.address, intraToken, this.auth.authenticateUser);
		}
	}

	signIn = () => {
		document.location.href = environment.link;
	}

}
