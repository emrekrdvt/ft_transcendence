import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Player } from "src/models/player.model";

@Injectable()
export class BalanceService {
	
	constructor() {}

	updateBalance = (user: User, score: number, player: Player, mode: string): number => {
		if (score == 1)
		{
			let  cash: number = user.cash + 100 / (20 - user.level + 1);
			if (mode == 'modded')
				cash += cash * 0.05;
			player.cashChange = cash;
			return cash;
		}
	};
}