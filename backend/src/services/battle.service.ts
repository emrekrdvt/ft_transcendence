import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { MatchmakingService } from "./matchmaking.service";
import { Player } from "../models/player.model";

@Injectable()
export class BattleService {
	battleRequests: any[] = [];

	constructor(private matchmakingService: MatchmakingService) {}

	createBattleRequest = (friendId: number, myID: number, clientId: string) => {
		const request = {
			friendId: friendId,
			myID: myID,
			clientId: clientId,
		};
		this.battleRequests.push(request);
		return request;
	};

	removeBattleRequest = (clientId: string) => {
		if (this.battleRequests.length > 0) {
			this.battleRequests = this.battleRequests.filter((request) => {
				return request.clientId !== clientId;
			});
		}
	};

	getRequests = (intraId: number) => {
		console.log('getRequests');
		return this.battleRequests.filter((request) => {
			return request.friendId === intraId;
		});
	};

	isAlreadyRequested = (friendId: number, myID: number): boolean => {
		console.log('isAlreadyRequested');
		console.log(this.battleRequests);
		for (let i = 0; i < this.battleRequests.length; i++) {
			if (this.battleRequests[i].friendId === friendId || this.battleRequests[i].myID === myID)
				return (true);
		}
		return false;
	}

	removeBattleRequests = (myID: number) => {
		let requests = this.battleRequests.filter((request) => {
			return request.myID !== myID;
		});
		this.battleRequests = requests;
		this.battleRequests = this.battleRequests.filter((request) => {
			return request.friendId !== myID;
		});
		return this.battleRequests;
	};

}