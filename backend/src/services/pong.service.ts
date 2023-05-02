import { Injectable } from '@nestjs/common';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

@Injectable()
export class PongService {
  private lobby: Player[] = [];

  addPlayer = (clientId: string, rating: number) => {
    const player: Player = {
      clientId: clientId,
      rating: rating,
    };
    this.lobby.push(player);
  };

  removePlayer = (clientId: string) => {
    this.lobby = this.lobby.filter((player) => player.clientId !== clientId);
  };

  collisionDetection = (match: Match, player: Player) => {
    if (match.ball.x  < player.x + player.width)
  }

  moveBall = (match: Match) => {
    match.ball.x += match.ball.velocityX;
    match.ball.y += match.ball.velocityY;
  };
}
