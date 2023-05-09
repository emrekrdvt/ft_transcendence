import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class BalanceService {
	
	constructor() {}

	updateBalance = (user: User, score: number): number => {
		if (score == 1)
			return user.cash + 100 / (20 - user.level + 1);
	};
}