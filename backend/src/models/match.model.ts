import { Player } from './player.model';
import { Ball } from './ball.model';

export interface Match {
  id: number;
  player1: Player;
  player2: Player;
  ball: Ball;
  canvasWidth?: number;
  canvasHeight?: number;
}
