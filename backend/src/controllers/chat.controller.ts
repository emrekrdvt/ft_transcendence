import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) { }

    @Get('getRooms')
    async getRooms() {
        const rooms = await this.chatService.getAllRoomName();
        return rooms;
    }

    @Get(':sender/:receiver/findRoomID')
    async findRoomID(@Param('sender') sender: string, @Param('receiver') receiver: string) {
        const roomID = await this.chatService.findRoomID(sender, receiver);
        return roomID;
    }

    @Get(':roomID/getMessages')
    async getMessages(@Param('roomID') roomID: string) {
        const messages = await this.chatService.getMessages(roomID);
        return messages;
    }

    @Post('/join-chat-room')
    async joinChatRoom(@Body() data: { roomID: string, intraID: number }) {
        //console.log("34. satır -->", data);
        const room = await this.chatService.joinChatRoom(data.roomID, data.intraID);
        return room;
    }

    @Post('/leave-chat-room')
    async leaveChatRoom(@Body() data: { roomID: string, intraID: number }) {

        const room = await this.chatService.leaveChatRoom(data);
        return room;
    }

    @Post('/set-mod')
    async setMod(@Body() data: { roomID: string, intraID: string, sender: string }) {
        console.log("chat.controller.ts 47. satır -->", data)
        const room = await this.chatService.setModerator(data.roomID, data.intraID, data.sender);
        return room;
    }

    @Post('/unset-mod')
    async unsetModerator(@Body() data: { roomID: string, unsetMod: string, sender: string }) {
        console.log("chat.controller.ts 56. satır -->", data.unsetMod)
        const room = await this.chatService.unsetModerator(data.roomID, data.unsetMod, data.sender);
        return room;
    }

    @Get(':roomID/findChatRoom')
    async findChatRoom(@Param('roomID') roomID: string) {
        const room = await this.chatService.getChatRoomId(roomID);
        return room;
    }

    @Get(':roomID/getPublicMessages')
    async getPublicMessages(@Param('roomID') roomID: string) {
        const messages = await this.chatService.getPublicMessages(roomID);
        return messages;
    }

    @Get(':roomName/:intraID/canIJoin')
    async canIJoin(@Param('roomName') roomName: string, @Param('intraID') intraID: number): Promise<boolean> {
        const room = await this.chatService.canIJoin(roomName, intraID);
        console.log("chat.controller.ts 77. satır -->", room);
        return room;
    }

    @Post('/unban')
    async unban(@Body() data: { roomName: string, whos: string, sender: string }) {
        console.log("chat.controller.ts 87. satır -->", data)
        const room = await this.chatService.unbanUser(data.roomName, data.whos, data.sender);
        return room;
    }

    @Post('/mute')
    async mute(@Body() data: { roomName: string, whos: string, sender: string, time: number }) {
        console.log("chat.controller.ts 94. satır -->", data)
        const room = await this.chatService.muteUser(data.roomName, data.whos, data.sender, data.time);
        return room;
    }

    @Post('/unmute')
    async unmute(@Body() data: { roomName: string, whos: string, sender: string }) {
        console.log("chat.controller.ts 101. satır -->", data)
        const room = await this.chatService.unmuteUser(data.roomName, data.whos, data.sender);
        return room;
    }
    
    //    return this.http.get<boolean>(`${this.apiUrl}/${roomName}/${senderName}/canIchat`)
    @Get(':roomName/:senderName/canIchat')
    async checkMute(@Param('roomName') roomName:string, @Param('senderName') senderName:string ): Promise<boolean> {
        const room = await this.chatService.canIchat(roomName, senderName);
        console.log("chat.controller.ts 77. satır -->", room);
        return room;
    }

    @Get('comparePassword/:roomName/:password')
    async comparePassword(@Param('roomName') roomName: string, @Param('password') password: string): Promise<boolean> {
        const room = await this.chatService.comparePassword(password, roomName);
        console.log("chat.controller.ts 77. satır -->", room);
        return room;
    }

    @Post('/changePassword')
    async changePassword(@Body() data: { roomName: string, password: string, senderName: string }) {
        console.log("chat.controller.ts 133. satır -->", data)
        const room = await this.chatService.changePassword(data.roomName, data.password, data.senderName);
        return room;
    }

    @Post('/destroyPass')
    async destroyPass(@Body() data: { roomName: string, password: string, senderName: string }) {
        console.log("chat.controller.ts 140. satır -->", data)
        const room = await this.chatService.destroyPassword(data.roomName, data.password, data.senderName);
        return room;
    }
}