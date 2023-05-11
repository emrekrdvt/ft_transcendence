import { Injectable, NotFoundException } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TwoFactorAuthService {
	private secret: string;
	constructor(private prisma: PrismaService) {}
	async generateQRCode(userName: string) {
		this.secret = speakeasy.generateSecret({
			name: 'PongHub',
		}).ascii;
		const userTwoFactorAuth = await this.prisma.user.findUnique({
			where: {
				username: userName
			}
		});
		if (userTwoFactorAuth.twoFactor == true) {
			const otpauthUrl = speakeasy.otpauthURL({
				secret: userTwoFactorAuth.twoFactorSecret,
				label: 'PongHub',
			});
			console.log(userTwoFactorAuth.twoFactorSecret)
			const qrCode = await qrcode.toDataURL(otpauthUrl);
			return qrCode
		}
		else {
			const updateUser = await this.prisma.user.update({
				where: {
					username: userName
				},
				data: {
					twoFactor: true,
					twoFactorSecret: this.secret,
				}
			});
			const otpauthUrl = speakeasy.otpauthURL({
				secret: updateUser.twoFactorSecret,
				label: 'PongHub',
			});
			console.log(updateUser.twoFactorSecret)
			const qrCode = await qrcode.toDataURL(otpauthUrl);
			return qrCode
		}
	}
	async verifyToken(token: string, userName: string) {
		console.log(userName)
		console.log("token --->", token)
		const user = await this.prisma.user.findUnique({
			where: {
				username: userName
			}
		});
		if (!user) throw new NotFoundException('User not found');
		const dbToken = user.twoFactorSecret;
		const isValid = speakeasy.totp.verify({
			secret: dbToken,
			encoding: 'ascii',
			token: token,
		});
		return isValid;
	}
	async disableTwoFactorAuth(userName: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				username: userName
			}
		});
		if (!user) throw new NotFoundException('User not found');
		const updatedUser = await this.prisma.user.update({
			where: {
				username: userName
			},
			data: {
				twoFactor: false,
				twoFactorSecret: null,
			}
		});
		return updatedUser;
	}
}