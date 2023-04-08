import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController]
})
export class AuthModule {}
