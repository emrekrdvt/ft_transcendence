import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

	  user!: User;
	  
	  input: string = '';

	  messages: any = [];

	  constructor(private userService: UserService) {}

	  ngOnInit() {
		this.user = this.userService.getUser()!;
	  }

	  addMessage(text: string, sender: string, date: Date) {
		const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		const time = hours + ':' + minutes + ':' + seconds;
		const message = {
			text,
			sender,
			time
		};
		this.messages.push(message);
	  }
	  onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter')
		{
			const el = event.target as HTMLInputElement;
			if (el.value)
				this.addMessage(el.value, this.user.username, new Date());
			el.value = '';
		}
	  }

}
