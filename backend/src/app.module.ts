import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';



@Module({
  imports: [UserModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
