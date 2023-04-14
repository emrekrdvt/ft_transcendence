import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';


@Injectable(
	{providedIn: 'root' }
)
export class RegisterService	
{
	private isRegister$ = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient, private userService: UserService, private router: Router){}

	isRegister = (): Observable<boolean> => {
		return this.isRegister$.asObservable();
	}

	beginRegister = () => {
		this.isRegister$.next(true);
		this.router.navigate(['/register']);
	}

	completeRegister = () => {
		const user = this.userService.getUser()!;
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
		this.router.navigate(['/']);
	}
}