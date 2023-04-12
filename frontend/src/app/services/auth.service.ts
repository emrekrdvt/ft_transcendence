import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { RegisterService } from './register.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService
{
	private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn$ = this._isLoggedIn$.asObservable();

	constructor(private http: HttpClient, private registerService: RegisterService){
		if (localStorage.getItem('user'))
			this._isLoggedIn$.next(true);
		else
			this._isLoggedIn$.next(false);
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
				if (this.registerService.checkRegister(res.isSigned) == false)
				{
					this.registerService.beginRegister();
					return ;
				}
				this._isLoggedIn$.next(true);
				document.location.href = '/home';
			},
			err => {
				console.log(err);
			}
		);
	}

	setLogin = () => {
		this._isLoggedIn$.next(true);
	}
	
}