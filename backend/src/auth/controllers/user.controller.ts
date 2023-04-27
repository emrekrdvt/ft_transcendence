import {
  Controller,
  Get,
  UseGuards,
  Req,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../guard';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
}
