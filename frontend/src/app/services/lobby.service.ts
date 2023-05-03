import { Injectable } from "@angular/core";
import { Player } from "../models/player.model";

@Injectable()
export class LobbyService {
	private lobby: Player[] = [];
	constructor() {}

	setLobby = (lobby: Player[]): void => {
		this.lobby = lobby;
	};

	getLobby = (): Player[] => {
		return this.lobby;
	};

	getLobbySize = (): number => {
		return this.lobby.length;
	};

}