import { Injectable } from '@angular/core';
import {LobbyService} from "./lobby.service";

@Injectable()
export class MatchService
{

  constructor(private readonly lobbyService: LobbyService) {
  }
  matchPlayers = async () => {
    const seekers = this.lobbyService.getSeekers();
    if (seekers.length < 2) return;
    const sortedSeekers = seekers.sort((a, b) => b.rating - a.rating);
    const player1 = sortedSeekers[0];
    const player2 = sortedSeekers[1];
    this.lobbyService.removeSeeker(player1);
    this.lobbyService.removeSeeker(player2);
  }
}
