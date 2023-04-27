import { Injectable } from '@angular/core';
import { Seeker} from "../models/seeker.model";
import {SocketService} from "./socket.service";

@Injectable()
export class LobbyService
{
  constructor(private readonly socketService: SocketService) { }

  getSeekers = (): Seeker[] => {
    this.socketService.sendEvent('listSeekers', null);
    this.socketService.listenToEvent('seekers').subscribe((seekers: Seeker[]) => {
      return seekers;
    });
    return [];
  }

  removeSeeker = (seeker: Seeker) => {
    this.socketService.sendEvent('removeSeeker', seeker);
  }
}
