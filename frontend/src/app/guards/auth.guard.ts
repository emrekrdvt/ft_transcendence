import { Injectable } from '@angular/core';
import { CanActivate, Router,} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { RegisterService } from '../services/register.service';

@Injectable({
	  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
	constructor(private router: Router, private authService:AuthService) {}

	canActivate = (): Observable<boolean> => {
		return this.authService.isAuthenticated().pipe(
			tap(isLoggedIn => {
				if (!isLoggedIn) {
					this.router.navigate(['/login']);
				}
			})
		);
	}

}