import { Injectable } from "@nestjs/common";
import { Player } from "../models/player.model";

@Injectable()
export class LobbyService {
	private default_lobby: Player[] = [];
	private modded_lobby: Player[] = [];

	addPlayer = (clientId: string, data: any, type: string) => {
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
		if (type === 'default')
			this.default_lobby.push(player);
		else if (type === 'modded')
			this.modded_lobby.push(player);
	};

	removePlayer = (clientId: string, lobby: Player[], type: string) => {
		lobby = lobby.filter((player) => player.clientId !== clientId);
		if (type === 'default')
			this.default_lobby = lobby;
		else if (type === 'modded')
			this.modded_lobby = lobby;
	};

	getLobby = (type: string): Player[] => {
		if (type === 'default')
			return this.default_lobby;
		else if (type === 'modded')
			return this.modded_lobby;
		return [];
	}

	getPlayer = (clientId: string, lobby: Player[]): Player | null => {
		return lobby.find((player) => player.clientId === clientId);
	}
}