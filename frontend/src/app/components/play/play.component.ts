import {Component, OnInit} from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit{

	inGame: boolean = false;

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		const user: User = this.userService.getUser()!;
		if (user.ingame === true)
			this.inGame = user.ingame;
	}
}
