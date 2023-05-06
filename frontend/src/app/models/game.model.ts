import { Player } from './player.model';
import {Ball} from "./ball.model";

export interface Game
{
	id: string;
	player1: Player;
	player2: Player;
	ball: Ball;
	end_message?: string;
	isFinished: boolean;
}
