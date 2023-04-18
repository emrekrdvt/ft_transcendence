import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable(
	{providedIn: 'root' }
)
export class RegisterService	
{
	private isRegister$ = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private userService: UserService, private router: Router){
		const user = this.userService.getUser();
		if (user !== null && user.isSigned === false)
			this.beginRegister();
	}

	isRegister = (): Observable<boolean> => {
		return this.isRegister$.asObservable();
	}

	beginRegister = () => {
		this.isRegister$.next(true);
		this.router.navigate(['/register']);
	}

	completeRegister = (callback: Function, selectedAvatar: string, selectedNickname: string) => {
		const user = this.userService.getUser()!;
		const body = { intraId: user.intraId}
		this.userService.updateUser(user, () => {
			user.avatarUrl = selectedAvatar;
		}, selectedAvatar);
		this.userService.updateUser(user, () => {
			user.nickname = selectedNickname;
		}, selectedNickname);
		user.isSigned = true;
		localStorage.setItem('user', JSON.stringify(user));
		this.http.post(environment.address + '/auth/register', body).subscribe(
			res => {
				console.log(res);
			},	
			err => {
				console.log("Error: ", err);
			}
		);
		
		this.isRegister$.next(false);
		callback();
	}
}