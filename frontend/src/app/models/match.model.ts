import { Player } from './player.model';

export interface Match
{
	player1: Player;
	player2: Player;
	date: Date;
	winner: Player;
}