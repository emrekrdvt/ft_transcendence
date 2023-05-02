import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

@Injectable()
export class MatchService {
  matches: Match[] = [];
  id = 0;
  matchPlayers = (lobby: Player[]): void => {
    const sortedLobby: Player[] = lobby.sort((a, b) => b.rating - a.rating);
    while (sortedLobby.length > 1) {
      const player1 = sortedLobby.shift();
      const player2 = sortedLobby.pop();
      const ball = {
        x: 1024 / 2,
        y: 768 / 2,
        velocityX: 8,
        velocityY: 8,
        size: 10,
      };
      const match: Match = {
        player1: player1,
        player2: player2,
        id: this.id,
        ball: ball,
        canvasWidth: 1024,
        canvasHeight: 768,
      };
      this.id++;
      this.matches.push(match);
    }
  };

  getMatches = (): Match[] => this.matches;
  getMatch = (matchId: number): Match => {
    return this.matches.find((match: Match): boolean => match.id === matchId);
  };
}
