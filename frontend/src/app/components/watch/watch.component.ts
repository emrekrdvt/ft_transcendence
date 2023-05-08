import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/route.service';

@Component({
	selector: 'app-watch',
	templateUrl: './watch.component.html',
	styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

	constructor(public routerService: RouterService){}
}
