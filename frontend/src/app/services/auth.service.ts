import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth';

@Injectable()
export class AuthService
{
	constructor(private http: HttpClient){}

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
		this.http.get<Auth>(address + '/users/me', { headers }).subscribe(
			res => {
				localStorage.setItem('user', JSON.stringify(res));
				//change this to redirect to home page
				document.location.href = '/home';
			},
			err => {
				console.log(err);
			}
		);
	}

	
}