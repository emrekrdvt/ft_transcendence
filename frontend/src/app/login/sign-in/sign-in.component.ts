import { Component, OnInit} from '@angular/core';
import { LoginComponent } from '../login.component';
import { environment } from 'src/environment/environment';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit{

	constructor(private logInComponent: LoginComponent, private location: Location, private http: HttpClient) {
	}
	
	ngOnInit() {
		if (this.location.path().includes('code')) {
			const code = this.location.path().split('=')[1];
			this.http.get(`http://localhost:3000/auth/user?code=${code}`).subscribe(res => {
				console.log(res);
			});
		}
	}

	signIn = () => {
		document.location.href = environment.link;
	}
}
