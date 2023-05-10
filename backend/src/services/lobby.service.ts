import { Injectable } from "@nestjs/common";
import { Player } from "../models/player.model";

@Injectable()
export class LobbyService {
	private lobby: Player[] = [];

	addPlayer = (clientId: string, data: any) => {
		const player: Player = {
			clientId: clientId,
			rating: data.rating,
			score: 0,
			nickname: data.nickname,
			intraId: data.intraId,
			avatarUrl: data.avatarUrl,
			eloChange: 0,
			xpChange: 0,
			cashChange: 0,
		};
		this.lobby.push(player);
	};

	removePlayer = (clientId: string) => {
		this.lobby = this.lobby.filter((player) => player.clientId !== clientId);
	};

	getLobby = (): Player[] => this.lobby;

	getPlayer = (clientId: string): Player | null => {
		return this.lobby.find((player) => player.clientId === clientId);
	}
}