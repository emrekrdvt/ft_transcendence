export interface Message {
	sender: string;
	receiver?: string;
	content: string;
	roomID?: string;
	roomName?: string;
	senderID?: number;
	text?: string;
}