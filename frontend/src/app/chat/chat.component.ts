import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

	  user = {
		name: 'John Doe',
		avatarUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
	  }

	  input: string = '';

	  messages: any = [];

	  constructor() { }

	  addMessage(text: string, sender: string, date: Date) {
		//Date to hours/minutes/seconds
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
				this.addMessage(el.value, this.user.name, new Date());
			el.value = '';
		}
	  }

}
