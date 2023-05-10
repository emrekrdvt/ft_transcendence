import {Component, OnInit} from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-play',
	templateUrl: './play.component.html',
	styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit{

	inGame: boolean = false;
	game!: Game;
	selected: string = 'default';
	switch = {
		default: false,
		modded: false
	};

	constructor() {}

	ngOnInit(): void {}
}
