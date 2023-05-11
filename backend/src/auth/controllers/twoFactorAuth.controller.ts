import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TwoFactorAuthService } from '../services/twoFactorAuth.service';

@Controller('twoAuth')
export class TwoFactorAuthController {

    constructor(private readonly twoFactorAuthService: TwoFactorAuthService) { }

    @Get('/qrcode/:userName')
    async generateQRCode(@Param('userName') userName: string) {
        return { qrCode: await this.twoFactorAuthService.generateQRCode(userName) };
    };

    @Post('verify')
    async verifyTwoFactorAuth(@Body() body: { token: string, userName: string }) {
        console.log("body", body)
        const isValid = await this.twoFactorAuthService.verifyToken(body.token, body.userName);
        return { isValid };
    };

    @Post('disable')
    async disableTwoFactorAuth(@Body() body: { userName: string }) {
        console.log("disabled");
        await this.twoFactorAuthService.disableTwoFactorAuth(body.userName);
    };
}