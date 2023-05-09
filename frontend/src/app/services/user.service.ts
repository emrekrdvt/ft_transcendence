import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
	};

	setUser = (user: User) => {
		localStorage.removeItem('user');
		localStorage.setItem('user', JSON.stringify(user));
	};

	updateUser = (user: User, callback: Function, data: any) => {
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${token}`
		});
		data = callback(data);
		return this.http.put(`${environment.address}/users/${user.intraId}`, data, { headers }).subscribe(res => {
			console.log("update user: ", res);
		});
	};

	getUserFromDb = () => {
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${token}`
		});
		this.http.get<User>(`${environment.address}/users/me`, { headers }).subscribe(res => {
			this.setUser(res);
		});
	}

	getUsersWinrate = (user: User) => {
		const winrate = (user.wins / (user.wins + user.losses)) * 100;
		return '%' + winrate.toFixed(2);
	};

	getIntraIdFromUsername(username: string): Observable<User> {
		return this.http.get<User>(`${environment.address}/users/username/${username}`);
	}

	sendFriendRequest(requesterId: number, requestedId: number) {
		return this.http.post<User>(`${environment.address}/users/${requesterId}/addFriend/${requestedId}`, {});
	}

	acceptFriendRequest(requesterId: number, requestedId: number) {
		return this.http.put<User>(`${environment.address}/users/${requesterId}/acceptFriend/${requestedId}`, {});
	}

	getFriendRequests() {
		const userId = this.getUser()?.intraId;
		const requestedID = this.http.get<any>(`${environment.address}/users/${userId}/friendRequests`);
		return requestedID;
	}

	getFriendRequestUserName() {
		const userId = this.getUser()?.intraId;
		const requestedID = this.http.get<any>(`${environment.address}/users/${userId}/friendRequests`);
		console.log(requestedID)
		return requestedID;
	}

	getFriends(): Observable<User[]> {
		const userId = this.getUser()?.intraId;
		const friends = this.http.get<User[]>(`${environment.address}/users/${userId}/friends`);
		console.log(userId)
		return friends;
	};

	declineFriendRequest(requesterId: number, requestedId: number) {
		return this.http.put<User>(`${environment.address}/users/${requesterId}/rejectFriend/${requestedId}`, {});
	};

	blockUser(friendUsername: string) {
		const userId = this.getUser()?.intraId;
		return this.http.put<User>(`${environment.address}/users/${userId}/block/${friendUsername}`, {});
	}

	removeBlock(friendUsername: string) {
		const userId = this.getUser()?.intraId;
		return this.http.put<User>(`${environment.address}/users/${userId}/unblock/${friendUsername}`, {});
	}

	getBlockedUsers(): Observable<User[]> {
		const userId = this.getUser()?.intraId;
		const blockedUsers = this.http.get<User[]>(`${environment.address}/users/${userId}/blockedUsers`);
		return blockedUsers;
	}

	removeFriend(friendUsername: string) {
		const userId = this.getUser()?.intraId;
		return this.http.put<User>(`${environment.address}/users/${userId}/removeFriend/${friendUsername}`, {});
	}

	enable2FA(userName: string) {
		return this.http.post<User>(`${environment.address}/auth/twoFactorOn/${userName}`, userName)
	}

	disable2FA(userName: string) {
		return this.http.post<User>(`${environment.address}/auth/twoFactorOff`, userName);
	}
}
