import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [ AuthModule, HttpModule, PrismaModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
