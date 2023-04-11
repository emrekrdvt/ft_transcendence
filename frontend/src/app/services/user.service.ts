import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService
{
	getUser = () => {
		const value  = localStorage.getItem('user');
		if (value) {
			const user: User = JSON.parse(value);
			return user;
		}
		return null;
	}
}