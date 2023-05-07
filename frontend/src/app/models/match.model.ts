export interface Match
{
	player1: string;
	player2: string;
	player1Score: number;
	player2Score: number;
	player1Elo: number;
	player2Elo: number;
	player1EloChange: number;
	player2EloChange: number;
	player1AvatarUrl: string;
	player2AvatarUrl: string;
	endMessage: string;
}