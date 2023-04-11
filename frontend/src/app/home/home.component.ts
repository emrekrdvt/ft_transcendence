import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

	user: any;

	constructor() {
		
	}

	ngOnInit() {
		const value  = localStorage.getItem('user');
		if (value) {
			const user: User = JSON.parse(value);
			this.user = user;
		}
	}

	signOut = () => {
		localStorage.removeItem('user');
		document.location.href = '/login';
	}
}
