import { Message } from "./message.model";

export interface Chatroom {
	name: string;
	password?: string;
	messages?: Message[];
	creator?: string;
	chatRoomID?: number;
	sender?: string;
	content?: string;
}