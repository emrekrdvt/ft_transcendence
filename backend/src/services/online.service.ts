import { Injectable } from "@nestjs/common";
import { Status } from "src/models/status.model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OnlineService {
	users: Status[] = [];

	constructor(private prismaService: PrismaService){}

	goOnline = (intraId: number, clientId: string): void => {
		const user = this.users.find(user => user.intraId === intraId);
		if (user) {
			user.online = true;
			user.ingame = false;
			user.chat = false;
			user.clientId = clientId;
		} else {
			this.users.push({intraId, clientId, ingame: false, online: true, chat: false});
		};
	};

	goOffline = (clientId: string): void => {
		const user = this.users.find(user => user.clientId === clientId);
		if (user) {
			user.online = false;
			user.ingame = false;
			user.chat = false;
		};
	};

	goIngame = (intraId: number): void => {
		const user = this.users.find(user => user.intraId === intraId);
		if (user) {
			user.ingame = true;
			user.chat = false;
			user.online = false;
		};
	}

	goInchat = (intraId: number): void => {
		const user = this.users.find(user => user.intraId === intraId);
		if (user) {
			user.chat = true;
			user.ingame = false;
			user.online = false;
		};
		
	}

	getFriends = async (intraId: number): Promise<Status[]> => {
		const user = await this.prismaService.user.findUnique({
			where: {
				intraId: intraId,
			},
			select: {
				friendIntraIds: true,
			}
		});
		const friendsIds = user.friendIntraIds;
		const Friends = this.users.filter(user => friendsIds.includes(user.intraId));
		return Friends;
	}
};