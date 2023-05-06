import { Component } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { MatchService } from 'src/app/services/match.service';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent {

	game: Game = this.matchService.getLastMatch()!;	

	constructor(private matchService: MatchService) { }
}
