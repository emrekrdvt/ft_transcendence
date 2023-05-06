export interface Player
{
	x: number,
	y: number,
	width: number,
	height: number,
	score?: number,
	nickname : string,
	rating: number,
	speed?: number,
	up?: boolean,
	down?: boolean,
	intraId: number,
	avatarUrl: string,
	eloChange?: number,
}