export interface Player {
	clientId: string;
	rating: number;
	score: number;
	nickname: string;
	intraId: number;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	speed?: number;
	up?: boolean;
	down?: boolean;
	avatarUrl?: string;
	eloChange: number;
	xpChange: number;
	cashChange: number;
}
