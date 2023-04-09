import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Location } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environment/environment'
import { Router } from '@angular/router'
import { User } from 'src/app/interfaces/user';
import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})


export class LoginComponent {
	
	private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn$ = this._isLoggedIn$.asObservable();

	constructor(private location: Location, private http: HttpClient, private router: Router, private cdRef: ChangeDetectorRef){
		const value  = localStorage.getItem('user');
		if (value) {
			this._isLoggedIn$.next(true);
		}
	}
		
	ngOnInit() {
		if (this.location.path().includes('code')) {
			const code = this.location.path().split('=')[1];
			this.http.get<User>(`http://10.11.242.115:3000/auth/user?code=${code}`).subscribe(
				res => {
					const headers = new HttpHeaders({
						'Authorization': `Bearer ${res.jwt_token}`
					});
					this.http.get<User>(`http://10.11.242.115:3000/users/me`, { headers}).subscribe(
						res => {
							localStorage.setItem('user', JSON.stringify(res));
							this._isLoggedIn$.next(true);
							document.location.href = '/home';
						},
						err => {
							console.log(err)
							this._isLoggedIn$.next(false);
						}
					)
				},
				err => {
					console.log(err)
					this._isLoggedIn$.next(false);
				}
			);
		}
	}

	signIn = () => {
		document.location.href = environment.link;
	}

}
