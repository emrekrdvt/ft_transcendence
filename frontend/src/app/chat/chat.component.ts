import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

		input: string = '';

	  constructor() { }


	  onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter')
		{
			const el = event.target as HTMLInputElement;
			console.log(el.value);
			el.value = '';
		}
	  }

}
