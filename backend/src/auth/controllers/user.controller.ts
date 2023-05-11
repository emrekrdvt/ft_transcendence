import {
	Controller,
	Get,
	UseGuards,
	Req,
	Put,
	Param,
	Body,
	Post,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../guard';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) { }

	@UseGuards(JwtGuard)
	@Get('me')
	getMe(@Req() req: Request) {
		return req.user;
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	async updateUser(@Param('id') id: number, @Body() data: any) {
		return this.userService.updateUser(+id, data);
	}

	@Get('get/:intraId')
	async getAnUser(@Param('intraId') intraId: number) {
		return this.userService.getAnUser(+intraId);
	}


	@Post(':requesterId/addFriend/:requestedId')
	async addFriend(
		@Param('requesterId') requesterId: string,
		@Param('requestedId') requestedId: string,
	) {
		return this.userService.addFriend(
			parseInt(requesterId),
			parseInt(requestedId),
		);
	}

	@Put(':requesterId/acceptFriend/:requestedId')
	async acceptFriend(
		@Param('requesterId') requesterId: string,
		@Param('requestedId') requestedId: string,
	) {
		return this.userService.acceptFriendship(
			parseInt(requesterId),
			parseInt(requestedId),
		);
	}

	@Put(':requesterId/rejectFriend/:requestedId')
	async rejectFriend(
		@Param('requesterId') requesterId: string,
		@Param('requestedId') requestedId: string,
	) {
		return this.userService.declineFriendship(
			parseInt(requesterId),
			parseInt(requestedId),
		);
	}

	@Get('username/:username')
	async getUserByUsername(@Param('username') username: string) {
		const user = await this.userService.getIntraID(username);
		return user;
	}

	@Get(':userId/friendRequests')
	async getAllRequests(@Param('userId') userId: string) {
		return this.userService.getAllRequests(parseInt(userId));
	}

	@Get(':userId/friends')
	async getAllFriends(@Param('userId') userId: string) {
		return this.userService.getAllFriendsIntraIDtoUsername(parseInt(userId));
	}

	@Put(':requesterId/block/:blockedUsername')
	async blockUser(
		@Param('requesterId') requesterId: string,
		@Param('blockedUsername') blockedUsername: string,
	) {
		return this.userService.blockUser(parseInt(requesterId), blockedUsername);
	}

	@Put(':requesterId/unblock/:blockedUsername')
	async unblockUser(
		@Param('requesterId') requesterId: string,
		@Param('blockedUsername') blockedUsername: string,
	) {
		return this.userService.unblockUser(parseInt(requesterId), blockedUsername);
	}

	@Get(':userId/blockedUsers')
	async getAllBlockedUsers(@Param('userId') userId: string) {
		return this.userService.getAllBlockedUsers(parseInt(userId));
	}

	@Put(':requesterId/removeFriend/:requestedId')
	async removeFriend(@Param('requesterId') requesterId: string,
		@Param('requestedId') requestedId: string) {
		return this.userService.removeFriend(parseInt(requesterId), requestedId);
	}


}
