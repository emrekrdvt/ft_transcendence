import { Player } from './player.model';
import {Ball} from "./ball.model";

export interface Game
{
	player1: Player;
	player2: Player;
	ball: Ball;
}
