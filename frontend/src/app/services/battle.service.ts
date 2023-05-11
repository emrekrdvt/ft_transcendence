import { Injectable } from "@angular/core";
import { SocketService } from "./socket.service";

@Injectable()
export class BattleService {

	myRequests: any = [];

	constructor(private socketService: SocketService) {}

	ngOnInit() {
	};

	createBattleRequest = (friendId: number, myID: number) => {
		const request = {
			friendId: friendId,
			myID: myID,
		};
		this.socketService.sendEvent('requestBattle', request);
	};

	getRequestsEvent = (intraId: number) => {
		this.socketService.sendEvent('getMyRequests', {intraId: intraId});
	};

	getRequests = () => {
		return this.myRequests;	
	};

	pushRequest = (request: any) => {
		this.myRequests.push(request);
	};

	setRequests = (requests: any) => {
		this.myRequests = requests;
	};

	joinBattle = (request: any) => {
		this.socketService.sendEvent('acceptBattle', request);
	};
}