import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

	user!: User;

	constructor(private userService: UserService, private authService: AuthService, private router: Router) {

	}

	ngOnInit() {
		this.user = this.userService.getUser()!;
	}

	signOut = () => {
		this.authService.logout();
		localStorage.removeItem('user');
    localStorage.removeItem('token');
		this.router.navigate(['/login']).then(r => console.log(r));
	}
}
