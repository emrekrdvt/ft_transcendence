import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [HttpModule, JwtModule.register({})],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [UserController, AuthController]
})
export class AuthModule {}
