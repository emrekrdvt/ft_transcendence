import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FriendshipStatus, User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async updateUser(id: number, data: any) {
		const user: User = await this.prisma.user.update({
			where: {
				intraId: id,
			},
			data: data,
		});
		return user;
	}

	async addFriend(requesterId: number, requestedId: number) {
		const requester = await this.prisma.user.findUnique({
			where: {
				intraId: requesterId,
			},
		});
		const requested = await this.prisma.user.findUnique({
			where: {
				intraId: requestedId,
			},
		});
		if (!requester || !requested) console.log('user not found');
		const checkRequesterBlockedFriends = await this.prisma.user.findUnique({
			where: {
				intraId: requesterId,
			},
			select: {
				blockedFriends: true,
			}
		});
		const checkRequestedBlockedFriends = await this.prisma.user.findUnique({
			where: {
				intraId: requestedId,
			},
			select: {
				blockedFriends: true,
			}
		});
		if (checkRequesterBlockedFriends.blockedFriends.includes(requestedId) || checkRequestedBlockedFriends.blockedFriends.includes(requesterId)) {
			console.log('blocked');
			return;
		}
		const friendship = await this.prisma.friendship.create({
			data: {
				status: FriendshipStatus.PENDING,
				requester: {
					connect: { intraId: requesterId },
				},
				requested: {
					connect: { intraId: requestedId },
				},
			},
		});
		return friendship;
	}

	async acceptFriendship(requestedId: number, requesterId: number) {
		const friendship = await this.prisma.friendship.findFirst({
			where: {
				OR: [
					{ requesterId: requesterId, requestedId: requestedId },
					{ requesterId: requestedId, requestedId: requesterId },
				],
			},
		});
		if (!friendship) throw new NotFoundException('Friendship not found');
		const updatedFriendship = await this.prisma.friendship.update({
			where: {
				id: friendship.id,
			},
			data: {
				status: FriendshipStatus.ACCEPTED,
			},
			include: {
				requester: true,
				requested: true,
			},
		});
		const [requester, requested] = [
			updatedFriendship.requester,
			updatedFriendship.requested,
		];
		await this.prisma.user.update({
			where: {
				intraId: requester.intraId,
			},
			data: {
				friendIntraIds: {
					push: requested.intraId,
				},
			},
		});
		await this.prisma.user.update({
			where: {
				intraId: requested.intraId,
			},
			data: {
				friendIntraIds: {
					push: requester.intraId,
				},
			},
		});
		await this.prisma.friendship.delete({
			where: {
				id: friendship.id,
			},
		});
		return updatedFriendship;
	}

	async declineFriendship(requestedId: number, requesterId: number) {
		const friendship = await this.prisma.friendship.findFirst({
			where: {
				OR: [
					{ requesterId: requesterId, requestedId: requestedId },
					{ requesterId: requestedId, requestedId: requesterId },
				],
			},
		});
		if (!friendship) throw new NotFoundException('Friendship not found');
		const deletedFriendship = await this.prisma.friendship.delete({
			where: {
				id: friendship.id,
			},
		});
		return deletedFriendship;
	}

	async getIntraID(username: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	async getAllRequests(id: number) {
		const friendReq = await this.prisma.friendship.findMany({
			where: {
				OR: [
					{ requestedId: id, status: FriendshipStatus.PENDING },
					{ requesterId: id, status: FriendshipStatus.PENDING },
				],
			},
			include: {
				requester: true,
				requested: true,
			},
		});

		const friendReqUsername = friendReq.map((friend) => {
			if (friend.requesterId === id) {
				return friend.requested.username;
			} else {
				return friend.requester.username;
			}
		});

		return friendReq;
	}

	async getAllFriendsIntraIDtoUsername(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: id,
			},
		});
		if (!user) throw new NotFoundException('User not found');


		const friends = await this.prisma.user.findMany({
			where: {
				intraId: {
					in: user.friendIntraIds,
				},
			},
		});

		return friends;
	}

	async blockUser(blockerId: number, blockedUsername: string) {

		const user = await this.prisma.user.findUnique({
			where: {
				intraId: blockerId,
			},
		});


		const blockedUser = await this.prisma.user.findUnique({
			where: {
				username: blockedUsername,
			},
		});

		const upateFriend = blockedUser.friendIntraIds.filter((friend) => friend !== blockerId);
		const updateUserFriend = user.friendIntraIds.filter((friend) => friend !== blockedUser.intraId);

		const updatedBlockedUser = await this.prisma.user.update({
			where: {
				intraId: blockedUser.intraId,
			},
			data: {
				friendIntraIds: {
					set: upateFriend,
				},
			},
		});
	
		const blockerUser = await this.prisma.user.update({
			where: {
				intraId: blockerId,
			},
			data: {
				blockedFriends: {
					push: blockedUser.intraId,
				},
				friendIntraIds: {
					set: updateUserFriend,
				},
			},
		});
		return [updatedBlockedUser, blockerUser];
	}


	async unblockUser(blockerId: number, blockedUsername: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: blockerId,
			},
		});
		const blockedUser = await this.prisma.user.findUnique({
			where: {
				username: blockedUsername,
			},
		});
		const updateFriends = user.blockedFriends.filter((friend) => friend !== blockedUser.intraId);
		const updatedUser = await this.prisma.user.update({
			where: {
				intraId: blockerId,
			},
			data: {
				blockedFriends: {
					set: updateFriends,
				},
			},
		});
		return updatedUser;
	}

	async getAllBlockedUsers(id: number) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					intraId: id,
				},
			});
			const findBlockUsers = await this.prisma.user.findMany({
				where: {
					intraId: {
						in: user.blockedFriends,
					},
				},
			});
			return findBlockUsers;
		}
		catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	async removeFriend(id: number, friendUsername: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				intraId: id,
			},
		});

		const friendUser = await this.prisma.user.findUnique({
			where: {
				username: friendUsername,
			},
		});

		const updateFriends = user.friendIntraIds.filter((friend) => friend !== friendUser.intraId);
		const updateFriendUser = friendUser.friendIntraIds.filter((friend) => friend !== user.intraId);
		const updatedUser = await this.prisma.user.update({
			where: {
				intraId: id,
			},
			data: {
				friendIntraIds: {
					set: updateFriends,
				},
			},
		});
		const updatedFriend = await this.prisma.user.update({
			where: {
				username: friendUsername,
			},
			data: {
				friendIntraIds: {
					set: updateFriendUser,
				},
			},
		});
		return [updatedUser, updatedFriend];
	}

	getAnUser = async (intraId: number) =>{
		return await this.prisma.user.findUnique({
			where: {
				intraId: intraId,
			},
		});
	};
}
