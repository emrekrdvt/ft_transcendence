import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Player } from "src/models/player.model";

@Injectable()
export class BalanceService {
	
	constructor() {}

	updateBalance = (user: User, score: number, player: Player): number => {
		if (score == 1)
		{
			const cash: number = user.cash + 100 / (20 - user.level + 1);
			player.cashChange = cash;
			return cash;
		}
	};
}