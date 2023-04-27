export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
  name: string;
  avatar: string;
  speed: number;
  events: {
    up: boolean;
    down: boolean;
  };
}
