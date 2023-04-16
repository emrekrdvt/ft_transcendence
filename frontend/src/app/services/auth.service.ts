import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { RegisterService } from './register.service';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService
{
	private isLoggedIn$ = new BehaviorSubject<boolean>(false);


	constructor(private http: HttpClient, private registerService: RegisterService, private router: Router){
		if (localStorage.getItem('user') !== null)
			this.isLoggedIn$.next(true);
	}

	isAuthenticated = (): Observable<boolean> => {
		return this.isLoggedIn$.asObservable();
	}	

	authentication = (address: string, intraToken: string, callback: Function) => {
		this.http.get<Auth>(address + '/auth/user?code=' + intraToken).subscribe(
			res => {
				callback(address, res.jwt_token);
			},
			err => {
				console.log(err);
			}
		);
	}

	authenticateUser = (address: string, token: string) => {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${token}`
		});
		this.http.get<User>(address + '/users/me', { headers }).subscribe(
			res => {
				localStorage.setItem('user', JSON.stringify(res));
				if (res.isSigned === false)
				{
					this.registerService.beginRegister();
				}		
				this.login();
			},
			err => {
				console.log(err);
			}
		);
	}

	login = () => {
		this.isLoggedIn$.next(true);
		this.router.navigate(['/']);
	}

	logout = () => {
		this.isLoggedIn$.next(false);
	}
	
}