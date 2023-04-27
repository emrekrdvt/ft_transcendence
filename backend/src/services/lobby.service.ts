import { Injectable } from '@nestjs/common';
import { Seeker } from 'src/models/seeker.model';

@Injectable()
export class LobbyService {
  private seekers: Seeker[] = [];

  addSeeker = (seeker: Seeker): void => {
    this.seekers.push(seeker);
  };

  removeSeeker = (clientId: string): void => {
    this.seekers = this.seekers.filter(
      (seeker) => seeker.clientId !== clientId,
    );
  };

  getSeekers = (): Seeker[] => {
    return this.seekers;
  };

  getSeeker = (clientId: string): Seeker | undefined => {
    return this.seekers.find((seeker) => seeker.clientId === clientId);
  };
}
