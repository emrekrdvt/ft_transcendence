import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private registerService: RegisterService, private authService: AuthService){}

	page: number = 0;

	path: string = '../assets/avatars/';

	selectedAvatar: string = '';
	selectedNickname: string = '';

	avatars = [
		{
			url: this.path + 'luna.jpeg',
			clicked: false
		},
		{
			url: this.path + 'artemis.jpeg',
			clicked: false
		},
		{
			url: this.path + 'mamoru.jpeg',
			clicked: false
		},
		{
			url: this.path + 'ami.jpeg',
			clicked: false
		},
		{
			url: this.path + 'makoto.jpeg',
			clicked: false
		},
		{
			url: this.path + 'rei.jpeg',
			clicked: false
		},
		{
			url: this.path + 'minako.jpeg',
			clicked: false
		},
		{
			url: this.path + 'usagi.jpeg',
			clicked: false
		},
	];

	nextPage = () => {
		if (this.page == 0 && this.selectedAvatar == '')
			return;
		if (this.page == 1 && this.selectedNickname == '')
			return;
		if (this.page == 2)
		{
			this.registerService.completeRegister(this.authService.login, this.selectedAvatar, this.selectedNickname);
			return;
		}
		this.page += 1;
	}

	selectAvatar = (url: string) => {
		this.selectedAvatar = url;
		this.avatars.forEach(avatar => {
			if (avatar.url == url)
			{
				avatar.clicked = true;
			}
			else
			{
				avatar.clicked = false;
			}
		});
	}

	selectNickname = (event: any) => {
		this.selectedNickname = event.target.value;
	}

}
