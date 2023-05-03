import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { PlayComponent } from '../play.component';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.scss']
})
export class GameStatsComponent {

	game: Game = this.parentComponent.game;

	constructor(private parentComponent: PlayComponent) {}
	

}
