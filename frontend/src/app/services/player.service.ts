import {Injectable} from "@angular/core";
import {Player} from "src/app/models/player.model";

@Injectable()
export class PlayerService
{
	constructor() { }

	createPlayerOne = (canvasHeight: number, playername: string): Player => {
    return {
      x: 0,
      y: canvasHeight / 2 - 50,
      width: 10,
      height: 100,
      score: 0,
      name: playername,
      avatar: "../assets/avatars/rei.jpeg",
      speed: 100 * 10,
      events: {
        up: false,
        down: false,
      }
    };
	}

	createPlayerTwo = (canvasWidth: number, canvasHeight: number, playername: string): Player => {
    return {
      x: canvasWidth - 10,
      y: canvasHeight / 2 - 50,
      width: 10,
      height: 100,
      score: 0,
      name: playername,
      avatar: "../assets/avatars/ren.jpeg",
      speed: 100 * 10,
      events: {
        up: false,
        down: false,
      }
    };
	}
}
