import { Component } from '@angular/core';
import { MainComponent } from '../profile/main/main.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
	selector: 'app-qr',
	templateUrl: './qr.component.html',
	styleUrls: ['./qr.component.scss']
})
export class QrComponent {
	
	status: string = 'open';
	url: string = this.main.qrCodeUrl;

	constructor(private main: MainComponent) { }

	close = () => {
		this.status = 'closed';
	};
}
