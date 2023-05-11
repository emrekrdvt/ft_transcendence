import { Component } from '@angular/core'
import { tap } from 'rxjs'
import { Location } from '@angular/common'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from '../../services/user.service'
import { environment } from 'src/environment/environment'
import { Router } from '@angular/router'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})


export class LoginComponent {

	twoFactorAuth: boolean = false;
	inputs: any[] = [];
	merged: string = '';
	result: string = 'no-result';

	constructor(private location: Location, private auth: AuthService, private router: Router) {
		if (localStorage.getItem('twoFactor') === 'true') {
			this.twoFactorAuth = true;
		}
	}

	ngOnInit() {
		if (localStorage.getItem('user') === null) {
			this.auth.isAuthenticated().pipe(
				tap(isLoggedIn => {
					if (isLoggedIn) {
						this.router.navigate(['/']);
						return;
					}
				}));
			if (this.location.path().includes('code')) {
				const intraToken = this.location.path().split('=')[1];
				this.auth.authentication(environment.address, intraToken, this.auth.authenticateUser);
			}
		}
		for (let i = 0; i < 6; i++) {
			this.inputs.push({ id: i, value: '', focus: false });
		}
	}

	signIn = () => {
		document.location.href = environment.link;
		
	}

	takeInput = (event: any) => {
		if (event.target.value.length === 6) {
			this.auth.twoFactorAuth(event.target.value);
		}
	}

	changeInput = (event: any, id: number) => {
		this.result = '';
		if (event.target.value.length > 1) {
			event.target.value = event.target.value[1];
		}	
		this.inputs[id].value = event.target.value;
		this.inputs[id].focus = true;
		for (let i = 0; i < 6; i++) {
			if (i !== id) {
				this.inputs[i].focus = false;
			}
		}
		this.merged = this.inputs.map(input => input.value).join('');
	};
	
	submit = (event: any) => {
		if (this.auth.twoFactorAuth(this.merged) === false && this.merged.length === 6 && event.keyCode === 13)
		{
			this.inputs.forEach(input => {
				input.value = '';
				input.focus = false;
				
			});
			this.merged = '';
			this.result = 'result';
			setTimeout(() => {
				this.result = 'no-result';
			}
			, 700);
		}
	};
}
