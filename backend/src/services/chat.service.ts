import { Injectable } from '@nestjs/common';
import { ChatRoom, BannedUsers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from './hash.service';


@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService, private hash: HashService) { }

	private chatRooms: ChatRoom[] = [];
	private chatRoomNames: string[] = [];
	private allPrivID: string[] = [];

	async createRoom(friendId: number, myID: number) {

		const findRoom = await this.prisma.chatRoom.findMany({
			where: {
				participants: {
					hasEvery: [myID, friendId],
				},
			},
		});

		if (findRoom.length > 0) {
			this.sendMessageToFriend(findRoom[0].name, null, myID);
		} else {
			const generateID = this.generateRoomID();
			this.allPrivID.push(generateID);
			const createRoom = await this.prisma.chatRoom.create({
				data: {
					name: generateID,
					participants: [myID, friendId],
					privChat: true,
				},
			});
			return createRoom;
		}
	}



	async sendMessageToFriend(
		roomID: string,
		message?: string,
		senderId?: number,
	) {
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomID,
			},
		});
		if (!room) {
			throw new Error(`Room with name "${roomID}" not found`);
		}
		if (message === null) {
			return;
		} else {
			const messageData = await this.prisma.message.create({
				data: {
					text: message,
					sender: {
						connect: {
							intraId: senderId,
						},
					},
					chatRoom: {
						connect: {
							id: room.id,
						},
					},
				},
			});
		}
	}

	async sendMessageToChannel(roomName: string, message: string, senderId: number) {
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			}
		})
		console.log(room);
		if (!room) {
			throw new Error(`Room with name "${roomName}" not found`);
		}
		const messageData = await this.prisma.message.create({
			data: {
				text: message,
				sender: {
					connect: {
						intraId: senderId,
					},
				},
				chatRoom: {
					connect: {
						id: room.id,
					},
				},
			},
		});
	}

	async createChatRoom(creator: string, roomName: string, password?: any) {
		if (password) {
			const encodePassword = await this.hash.hashPassword(password);
			const creatorID = await this.prisma.user.findUnique({
				where: {
					username: creator,
				},
			});
			const isRoomExist = await this.prisma.chatRoom.findFirst({
				where: {
					name: roomName,
				},
			});
			if (isRoomExist) {
				return;
			}
			else {
				const createRoom = await this.prisma.chatRoom.create({
					data: {
						name: roomName,
						creator: [creatorID.intraId],
						password: encodePassword,
					},
				});
				this.chatRooms.push(createRoom);
				this.chatRoomNames.push(createRoom.name);
				console.log(this.chatRooms);
				return createRoom;
			}
		}
		else {
			const creatorID = await this.prisma.user.findUnique({
				where: {
					username: creator,
				},
			});
			const isRoomExist = await this.prisma.chatRoom.findFirst({
				where: {
					name: roomName,
				},
			});
			if (isRoomExist) {
				return;
			}
			else {
				const createRoom = await this.prisma.chatRoom.create({
					data: {
						name: roomName,
						creator: [creatorID.intraId],
					},
				});
				this.chatRooms.push(createRoom);
				this.chatRoomNames.push(createRoom.name);
				console.log(this.chatRooms);
				return createRoom;
			}
		}
	}

	async leaveChatRoom(data: any) {
		console.log(data);
	}

	async setModerator(roomName: string, intraID: string, sender: string) {
		const checkRole = await this.checkRole(roomName, sender);
		const checkUserInRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				participants: true,
			},
		});
		const user = this.prisma.user.findFirst({
			where: {
				username: intraID,
			},
		});
		if (checkRole == "creator") {
			if (!checkUserInRoom.participants.includes((await user).intraId)) {
				return;
			}
			else {
				const addMod = await this.prisma.chatRoom.update({
					where: {
						name: roomName,
					},
					data: {
						moderator: {
							push: (await user).intraId,
						},
					},
				});
				return addMod
			}
		}
		else {
			return;
		}
	}
	async unsetModerator(roomName: string, unsetMod: string, sender: string) {
		const checkRole = await this.checkRole(roomName, sender);
		const checkUserIsMod = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				moderator: true,
			},
		});
		const user = await this.prisma.user.findFirst({
			where: {
				username: unsetMod,
			},
		});

		if (checkRole == "creator") {
			if (!checkUserIsMod.moderator.includes((await user).intraId)) {
				return;
			}
			else {
				const remove = checkUserIsMod.moderator.filter((moderator) => moderator !== user.intraId);
				const removeMod = await this.prisma.chatRoom.update({
					where: {
						name: roomName,
					},
					data: {
						moderator: {
							set: remove,
						},
					},
				});
				return removeMod
			}
		}
		else {
			return;
		}
	}

	async joinChatRoom(chatRoomName: string, intraID: number, password?: any) {
		const name: string = chatRoomName;
		const findRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: chatRoomName,
			},
		});
		const userInRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: chatRoomName,
			},
			select: {
				participants: true
			}
		});
		if (userInRoom) {
			if (userInRoom.participants.includes(intraID)) {
				return;
			}
		}
		try {
			const updateRoom = await this.prisma.chatRoom.update({
				where: {
					name: chatRoomName,
				},
				data: {
					participants: {
						push: intraID,
					},
				},
			});
			return updateRoom;
		}
		catch (error) {
			console.log(error);
		}
	}

	async comparePassword(password: string, roomName: any): Promise<boolean> {
		const findRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				password: true,
			},
		});
		const decodePassword = await this.hash.comparePassword(password, findRoom.password);
		return decodePassword;
	}

	private generateRoomID() {
		let id: string = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

		for (let i = 0; i < 5; i++) {
			id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return id;
	};

	async getAllRoomName() {
		const rooms = await this.prisma.chatRoom.findMany({
			where: {
				NOT: { privChat: true },
			},
			select: {
				name: true,
				creator: true,
				password: true,
			},
		});
		return rooms;
	};

	async findRoomID(sender: string, receiver: string) {
		const senderID = await this.prisma.user.findUnique({
			where: {
				username: sender,
			},
		});
		const receiverID = await this.prisma.user.findUnique({
			where: {
				username: receiver,
			},
		});
		const roomName = await this.prisma.chatRoom.findMany({
			where: {
				participants: {
					hasEvery: [senderID.intraId, receiverID.intraId],
				},
			},
		});
		return roomName.map((room) => room.name);
	};

	async findUserID(username: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});
		return user.intraId;
	};


	async getUsernameFromID(id: number): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: id,
			},
		});
		return user.username;
	};

	async getMessages(roomID: string) {
		const messages = await this.prisma.message.findMany({
			where: {
				chatRoom: {
					name: roomID,
				},
			},
			select: {
				text: true,
				sender: {
					select: {
						username: true,
					},
				},
			},
		});
		return messages;
	};

	async getChatRoomId(roomID: string) {
		const room = await this.prisma.chatRoom.findUnique({
			where: {
				name: roomID,
			},
		});
		return room.id
	};


	async getPublicMessages(roomID: string) {
		const messages = await this.prisma.message.findMany({
			where: {
				chatRoom: {
					name: roomID,
				},
			},
			select: {
				text: true,
				sender: {
					select: {
						username: true,
					}
				},
			},
		});

		const formattedMessages = messages.map(({ text, sender: { username } }) => ({
			text,
			sender: username
		}));

		return formattedMessages;
	};


	async kickUser(roomName: string, kickedName: string, sender: string) {
		const findRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				participants: true,
				moderator: true,
				creator: true,
			},
		});

		const senderID = await this.prisma.user.findUnique({
			where: {
				username: sender,
			},
		});

		const kickedID = await this.prisma.user.findUnique({
			where: {
				username: kickedName,
			},
		});

		if (!kickedID) {
			return;
		}
		if (!findRoom.participants.includes(kickedID.intraId)) {
			return;
		}
		else {
			if (findRoom.creator.includes(senderID.intraId)) {
				const deleteUser = findRoom.participants.filter((intraId) => intraId !== kickedID.intraId);
				const updateRoom = await this.prisma.chatRoom.update({
					where: {
						name: roomName,
					},
					data: {
						participants: deleteUser,
					},
				});
				return updateRoom;
			}
		}
	};

	async banUser(roomName: string, whos: string, senderName: string, time: number) {
		const role = await this.checkRole(roomName, senderName);
		if (role == "user") {
			return 3;
		}
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
		});
		const senderID = await this.prisma.user.findUnique({
			where: {
				username: senderName,
			},
		});
		const whosID = await this.prisma.user.findUnique({
			where: {
				username: whos,
			},
		});
		if (!whosID) {
			return
		}
		if (role == "creator" || role == "moderator") {
			if (room.creator.includes(whosID.intraId)) {
				return 1;
			}
			const deleteUser = room.participants.filter((intraId) => intraId !== whosID.intraId);
			const updateRoom = await this.prisma.chatRoom.update({
				where: {
					name: roomName,
				},
				data: {
					participants: deleteUser,
				},
			});
			try {
				const bannedUsers = whosID.intraId;
				const now = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
				const banEndTime = new Date(Date.now() + time * 60 * 1000)
				const banUser = await this.prisma.bannedUsers.create({
					data: {
						bannedUsers: bannedUsers,
						chatRoomId: roomName,
						banEndTime: banEndTime,
					}
				});
				setTimeout(async () => {
					const unbanUser = await this.prisma.bannedUsers.findFirst({
						where: {
							chatRoomId: roomName,
						},
					});
					const deleteData = await this.prisma.bannedUsers.delete({
						where: {
							id: unbanUser.id,
						},
					});
				}, time * 60 * 1000);
			}
			catch (err) {
				console.log(err)
			}
		}
	};

	async checkRole(roomName: string, senderName: string) {
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				creator: true,
				moderator: true,
			},
		});

		const senderID = await this.prisma.user.findUnique({
			where: {
				username: senderName,
			},
		});

		if (room.creator.includes(senderID.intraId)) {
			return 'creator';
		}
		else if (room.moderator.includes(senderID.intraId)) {
			return 'moderator';
		}
		else {
			return 'user';
		}
	};

	async canIJoin(roomName: string, intraID: number): Promise<boolean> {
		const id = parseInt(intraID.toString())
		try {
			const amIBanned = await this.prisma.bannedUsers.findMany({
				where: {
					chatRoomId: roomName,
					bannedUsers: id,
				}
			});
			return amIBanned.length > 0 ? false : true;
		}
		catch (err) {
			return;
		}
	};

	async unbanUser(roomName: string, whos: string, senderName: string) {
		const role = await this.checkRole(roomName, senderName);
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
		});
		if (role == "creator" || role == "moderator") {
			const whosID = await this.prisma.user.findUnique({
				where: {
					username: whos,
				},
			});
			const unbanUser = await this.prisma.bannedUsers.findFirst({
				where: {
					chatRoomId: roomName,
					bannedUsers: whosID.intraId,
				},
			});
			const deleteData = await this.prisma.bannedUsers.delete({
				where: {
					id: unbanUser.id,
				},
			});
			return deleteData;
		}
		else {
			return;
		}
	};

	async muteUser(roomName: string, whos: string, senderName: string, time: number) {
		const role = await this.checkRole(roomName, senderName);
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
		});
		if (role == "creator" || role == "moderator") {
			const whosID = await this.prisma.user.findUnique({
				where: {
					username: whos,
				},
			});
			if (room.shutUp.includes(whosID.intraId)) {
				return;
			}
			if (role == "moderator") {
				if (room.moderator.includes(whosID.intraId)) {
					return;
				}
			}
			const muteUser = await this.prisma.chatRoom.update({
				where: {
					name: roomName,
				},
				data: {
					shutUp: {
						push: whosID.intraId,
					}
				},
			});
			setTimeout(async () => {
				const unMuteUser = await this.prisma.chatRoom.update({
					where: {
						name: roomName,
					},
					data: {
						shutUp: {
							set: room.shutUp.filter((intraId) => intraId !== whosID.intraId),
						}
					},
				});
			}, time * 60 * 1000);
		}
	}

	async unmuteUser(roomName: string, whos: string, senderName: string) {
		const role = await this.checkRole(roomName, senderName);
		const room = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
		});
		if (role == "creator" || role == "moderator") {
			const whosID = await this.prisma.user.findUnique({
				where: {
					username: whos,
				},
			});
			const unMuteUser = await this.prisma.chatRoom.update({
				where: {
					name: roomName,
				},
				data: {
					shutUp: {
						set: room.shutUp.filter((intraId) => intraId !== whosID.intraId),
					}
				},
			});
			return unMuteUser;
		}
		else {
			return;
		}
	};


	async canIchat(roomName: string, senderName: string): Promise<boolean> {
		const user = await this.prisma.user.findUnique({
			where: {
				username: senderName,
			},
		});
		const amIshutUPPED = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
				shutUp: {
					has: user.intraId,
				}
			},
		});
		if (amIshutUPPED) {
			return false;
		}
		else {
			return true;
		}
	};

	async changePassword(roomName: string, password: string, senderName: string) {
		const role = await this.checkRole(roomName, senderName);
		const findRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				password: true,
			},
		});
		if (!findRoom) {
			return;
		}
		if (role == "creator") {
			const newHashedPassword = await this.hash.hashPassword(password);
			const updatePassword = await this.prisma.chatRoom.update({
				where: {
					name: roomName,
				},
				data: {
					password: {
						set: newHashedPassword,
					},
				},
			});;
			return updatePassword;
		}
	};

	async destroyPassword(roomName: string, password: string, senderName: string) {
		const role = await this.checkRole(roomName, senderName);
		const findRoom = await this.prisma.chatRoom.findFirst({
			where: {
				name: roomName,
			},
			select: {
				password: true,
			},
		});
		if (!findRoom) {
			return;
		}
		if (role == "creator" && this.hash.comparePassword(password, findRoom.password)) {
			const updatePassword = await this.prisma.chatRoom.update({
				where: {
					name: roomName,
				},
				data: {
					password: {
						set: null,
					},
				},
			});
			return updatePassword;
		}
	};
}