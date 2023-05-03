import { Injectable } from "@angular/core";

@Injectable()
export class PlayerService {
	constructor() {}

	createPlayer = (rating: number, nickname: string, avatarUrl: string, intraId: number) => {
		return {
			rating: rating,
			score: 0,
			nickname: nickname,
			intraId: intraId,
			avatarUrl: avatarUrl,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		}
	}
}