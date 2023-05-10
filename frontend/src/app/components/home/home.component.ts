import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

	user!: User;

	constructor(private userService: UserService, private authService: AuthService, private router: Router, private socketService: SocketService) {
	}

	ngOnInit() {
		this.user = this.userService.getUser()!;
		this.socketService.sendEvent('status_connect', this.user.intraId);
	}

	signOut = () => {
		this.socketService.sendEvent('logout', this.user.intraId);
		this.authService.logout();
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.router.navigate(['/login']).then(r => console.log(r));
	}
}
