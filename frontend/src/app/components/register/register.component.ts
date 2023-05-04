import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private registerService: RegisterService, private authService: AuthService){}

	page: number = -1;

	path: string = '../assets/avatars/';
	upload: boolean = false;
	selectedAvatar: string = '';
	selectedNickname: string = '';

	avatars: any = [];

	ngOnInit(): void {
		fetch('../assets/avatars.json')
			.then(response => response.json())
			.then(data => {
				this.avatars = data.avatars;
				this.avatars.forEach((avatar: any) => {
					avatar.url = this.path + avatar.url;
					avatar.clicked = false;
				});
			}
		);
	};

	nextPage = () => {
		if (this.page == 0 && this.selectedAvatar == '')
			return;
		if (this.page == 1 && this.selectedNickname == '')
			return;
		if (this.page == 1 && !this.registerService.checkNickname(this.selectedNickname))
			return;
		if (this.page == 2)
		{
			this.registerService.completeRegister(this.authService.login, this.selectedAvatar, this.selectedNickname);
			return;
		}
		this.page += 1;
	};

	selectAvatar = (url: string) => {
		this.selectedAvatar = url;
		this.avatars.forEach((avatar: any) => {
			avatar.clicked = avatar.url == url;
		});
	};

	selectNickname = (event: any) => {
		this.selectedNickname = event.target.value;
	};

	chooseAvatar = () => {
		this.upload = false;
	};

	uploadAvatar = () => {
		this.upload = true;
	};

}
