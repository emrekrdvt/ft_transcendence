import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService
{

	constructor(private http: HttpClient) { }

	getUser = () => {
		const value  = localStorage.getItem('user');
		if (value) {
			const user: User = JSON.parse(value);
			return user;
		}
		return null;
	}

	updateUser = (user: User, callback: Function, data: any) => {
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${token}`
		});
		data = callback(data);
		return this.http.put(`${environment.address}/users/${user.intraId}`, data, { headers }).subscribe(res => {
			console.log("update user: ", res);
		});
	}
}
