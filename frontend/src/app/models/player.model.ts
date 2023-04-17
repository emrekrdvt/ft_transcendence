export interface Player
{
	x: number,
	y: number,
	width: number,
	height: number,
	score: number,
	name : string,
	speed: number,
	events: {
		up: boolean,
		down: boolean,
	}
	avatar: string,
}