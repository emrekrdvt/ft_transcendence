import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserService {

	constructor(private prisma: PrismaService) {}

	async updateUser(id: number, data:any) {
		const user = await this.prisma.user.update({
		where: { 
			intraId: id,
		},
		data: data,
		});
		return user;
	}
}
