import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService 
{
	constructor(private socket: Socket) {}

	public sendEvent(eventName: string, data: any) {
		this.socket.emit(eventName, data);
	}

	public listenToEvent(eventName: string): Observable<any> {
		return new Observable<any>((observer) => {
			this.socket.on(eventName, (data: any) => {
				observer.next(data);
			});
		});
	}
}