import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class BalanceService {
	
	constructor() {}

	updateBalance = (user: User, score: number): number => {
		if (score == 1)
			return user.cash + 100 / (20 - user.level + 1);
		else if (score == 0.5)
			return user.cash + 50 / (20 - user.level + 1);
	};
}