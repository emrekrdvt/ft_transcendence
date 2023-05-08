import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class RouterService {

	constructor(private router: Router) { }

	routeToHome() {
		this.router.navigate(['home']);
	};

	routeToProfile() {
		this.router.navigate(['profile']);
	};
}