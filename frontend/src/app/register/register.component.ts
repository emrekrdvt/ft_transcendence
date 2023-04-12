import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	constructor(private registerService: RegisterService){}

	page: number = 0;

	path: string = '../assets/avatars/';

	avatars = [
		{
			name: 'luna',
			url: this.path + 'luna.jpeg'
		},
		{
			name: 'artemis',
			url: this.path + 'artemis.jpeg'
		},
		{
			name: 'mamoru',
			url: this.path + 'mamoru.jpeg'
		},
		{
			name: 'ami',
			url: this.path + 'ami.jpeg'
		},
		{
			name: 'makoto',
			url: this.path + 'makoto.jpeg'
		},
		{
			name: 'rei',
			url: this.path + 'rei.jpeg'
		},
		{
			name: 'minako',
			url: this.path + 'minako.jpeg'
		},
		{
			name: 'usagi',
			url: this.path + 'usagi.jpeg'
		},
	];

	nextPage = () => {
		if (this.page == 2)
		{
			this.registerService.completeRegister();
			return;
		}
		this.page += 1;
	}

}
