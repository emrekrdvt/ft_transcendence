import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { environment } from 'src/environment/environment';


@Injectable()
export class RegisterService	
{
	private _isRegister$ = new BehaviorSubject<boolean>(false);
	isRegister$ = this._isRegister$.asObservable();

	constructor(private http: HttpClient, private userService: UserService){}

	checkRegister = (isRegister: boolean) : boolean => {
		if (isRegister == false)
			return false;
		return true;
	}

	beginRegister = () => {
		this._isRegister$.next(true);
		localStorage.setItem('register', 'progress');
	}

	completeRegister = () => {
		const user = this.userService.getUser()!;
		this._isRegister$.next(false);
		localStorage.removeItem('register');
		const body = { intraId: user.intraId}
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
		document.location.href = '/home';
	}
}