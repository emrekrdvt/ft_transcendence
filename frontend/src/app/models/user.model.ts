import {Game} from "./game.model";

export interface User
{
	intraId: number;
	username: string;
	isSigned: boolean;
	email: string;
	nickname: string;
	avatarUrl: string;
	rating: number;
	wins: number;
	losses: number;
	draws: number;
	games: number;
	rank: number;
	ingame: boolean;
	level: number;
	xp: number;
	xpToNextLevel: number;
	cash: number;
}
