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
		up: Boolean,
		down: Boolean,
	}
	avatar: string,
}