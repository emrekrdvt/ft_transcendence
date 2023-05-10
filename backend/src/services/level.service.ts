import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Player } from "src/models/player.model";

@Injectable()
export class LevelService {
	exps: number[] = [ 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000 ];
	updateXp = (level: number, score: number): number => {
		if (score == 1)
			return 100 + (level * 10);
		else if (score == 0)
			return 50 + (level * 5);
	};

	updateLevel = (user: User, score: number, player: Player): User => {
		const xp = this.updateXp(user.level, score);
		user.xp += xp;
		if (user.xp >= user.xpToNextLevel && user.level < 20)
		{
			user.level++;
			player.xpChange = -1;
			user.xpToNextLevel = this.exps[user.level - 1];
		}
		else
			player.xpChange = xp;
		return user;
	};
}