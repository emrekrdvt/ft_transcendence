import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Game } from '../models/game.model';
import { Server, Socket } from 'socket.io';
import { RatingService } from './rating.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match } from '@prisma/client';
import { UserService } from 'src/auth/services/user.service';
import { LevelService } from './level.service';
import { BalanceService } from './balance.service';
import { AchievementService } from './achievement.service';

@Injectable()
export class PongService {

	constructor(private ratingService: RatingService,
			private prismaService: PrismaService,
			private userService: UserService,
			private levelService: LevelService,
			private balanceService: BalanceService,
			private achievementService: AchievementService) {}

	collisionDetection = (game: Game, player: Player, add: number) => {
		if (game.ball.x  < player.x + player.width + add
			&& game.ball.x + game.ball.size > player.x
			&& game.ball.y < player.y + player.height
			&& game.ball.y + game.ball.size > player.y) {
				return true;
			}
		return false;
	}

	getDeltaTime = (game: Game): number => {
		const now = performance.now();
		const deltaTime = (now - game.lastTime) / 1000;
		game.lastTime = now;
		return deltaTime;
	}

	scoreDetection = (game: Game, player: Player) => {
		player.score++;
		game.ball.x = game.canvasWidth / 2;
		game.ball.y = game.canvasHeight / 2;
		game.ball.velocityX = -game.ball.velocityX;
	};

	moveBall = (game: Game) => {
		game.ball.x += game.ball.velocityX;
		game.ball.y += game.ball.velocityY;
		if (this.collisionDetection(game, game.player1, 10) || this.collisionDetection(game, game.player2, 0)) {
			Math.random() > 0.5 ? game.ball.velocityY *= -1 : game.ball.velocityY *= 1;
			game.ball.velocityX *= -1;
		}
		else
		{
			if (game.ball.x + game.ball.size > game.canvasWidth)
			{
				this.scoreDetection(game, game.player1);
				return game;
			}
			else if (game.ball.x - game.ball.size < 0)
			{
				this.scoreDetection(game, game.player2);
				return game;
			}
			if (game.ball.y + game.ball.size > game.canvasHeight || game.ball.y - game.ball.size < 0)
				game.ball.velocityY *= -1;
			if (game.ball.x + game.ball.size > game.canvasWidth || game.ball.x - game.ball.size < 0)
				game.ball.velocityX *= -1;
		}
		return game;
	};

	movePlayer = (game: Game, player: Player, deltaTime: number) => {
		if (player.up)
			player.y -= player.speed * deltaTime;
		if (player.down)
			player.y += player.speed * deltaTime;
		if (player.y < 0)
			player.y = 0;
		if (player.y + player.height > game.canvasHeight)
			player.y = game.canvasHeight - player.height;
		if (player.nickname == game.player1.nickname)
			game.player1 = player;
		else
			game.player2 = player;
	};

	changePlayerState = (game: Game, player: Player, client: Socket, server: Server) => {
		if (game == null)
			return;
		if (game.player1.clientId === client.id) {
			game.player1.up = player.up;
			game.player1.down = player.down;
		}
		else if (game.player2.clientId === client.id) {
			game.player2.up = player.up;
			game.player2.down = player.down;
		};
		server.to(game.id).emit('game', game);
	};


	updateGame = (game: Game, server: Server, roomId: string): Game => {
		const deltaTime = this.getDeltaTime(game);
		this.movePlayer(game, game.player1, deltaTime);
		this.movePlayer(game, game.player2, deltaTime);
		this.moveBall(game);
		return game;
	};

	startGame = async (game: Game, server: Server, roomId: string): Promise<void> => {
		while (game.player1.score < 5 && game.player2.score < 5)
		{
			await new Promise(resolve => setTimeout(resolve, 10));
			this.updateGame(game, server, roomId);
			server.to(roomId).emit('game', game);
		}
		this.endGame(game, server, roomId);
	};

	createMatch = async (score: number, player1: Player, player2: Player, user: Player) => {
		
		await this.prismaService.match.create({
			data: {
				player1: player1.nickname,
				player2: player2.nickname,
				player1Score: player1.score,
				player2Score: player2.score,
				player1EloChange: player1.eloChange,
				player2EloChange: player2.eloChange,
				player1Elo: player1.rating,
				player2Elo: player2.rating,
				player1AvatarUrl: player1.avatarUrl,
				player2AvatarUrl: player2.avatarUrl,
				player1CashChange: player1.cashChange,
				player2CashChange: player2.cashChange,
				player1XPChange: player1.xpChange,
				player2XPChange: player2.xpChange,
				user: {
					connect: {
						intraId: user.intraId
					}
				},
				isWin: score == 1 ? true : false,
				endMessage: player1.score == 5 ? player1.nickname + ' won' : player2.nickname + ' won'
			}
		});
	};

	endGame = async (game: Game, server: Server, roomId: string) => {
		let score: number;
		if (game.player1.score == 5)
			score = 1;
		else if (game.player2.score == 5)
			score = 0;
		this.ratingService.calculateNewElo(game.player1, game.player2, score);
		let user1 = await this.prismaService.user.findUnique({
			where: {
				intraId: game.player1.intraId
			}
		});
		user1 = this.levelService.updateLevel(user1, score, game.player1);
		this.userService.updateUser(game.player1.intraId, { wins: user1.wins + (score == 1 ? 1 : 0),
			losses: user1.losses + (score == 0 ? 1 : 0),
			rating: game.player1.rating,
			games: user1.games + 1,
			level: user1.level,
			xp: user1.xp,
			xpToNextLevel: user1.xpToNextLevel,
			cash: this.balanceService.updateBalance(user1, score, game.player1)});
		let user2 = await this.prismaService.user.findUnique({
			where: {
				intraId: game.player2.intraId
			}
		});
		user2 = this.levelService.updateLevel(user2, score === 1 ? 0 : 1, game.player2);
		this.userService.updateUser(game.player2.intraId, { wins: user2.wins + (score == 0 ? 1 : 0),
			losses: user2.losses + (score == 1 ? 1 : 0),
			rating: game.player2.rating,
			games: user2.games + 1,
			level: user2.level,
			xp: user2.xp,
			xpToNextLevel: user2.xpToNextLevel,
			cash: this.balanceService.updateBalance(user2, score === 1 ? 0 : 1, game.player2)});
		await this.createMatch(score, game.player1, game.player2, game.player1);
		await this.createMatch(score === 1 ? 0 : 1, game.player1, game.player2, game.player2);
		await this.achievementService.progressEndGameAchievements(user1);
		await this.achievementService.progressEndGameAchievements(user2);
		server.to(roomId).emit('endGame', { user1: user1, user2: user2 });	
	}
}
