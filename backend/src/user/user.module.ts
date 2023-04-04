import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}


