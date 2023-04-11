import { Component } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

	constructor(public profile: ProfileComponent) { }

}
