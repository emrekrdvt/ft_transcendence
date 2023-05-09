import { Module } from '@nestjs/common';
import { ChatGateway } from '../gateways/chat.gateway';
import { ChatService } from '../services/chat.service';
import { ChatController } from '../controllers/chat.controller';
import { HashService } from '../services/hash.service';

@Module({
    providers: [ChatGateway, ChatService, HashService],
    controllers: [ ChatController],
})
export class ChatModule {}