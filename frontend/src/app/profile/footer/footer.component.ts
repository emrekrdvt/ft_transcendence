import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	informations = [
		{
			title: 'Full Name',
			value: 'John Doe'
		},
		{
			title: 'Campus',
			value: 'Istanbul'
		},
		{
			title: 'Piscine',
			value: '2022 February'
		},
		{
			title: 'Phone',
			value: '+90 555 555 55 55'
		}
	]

}
