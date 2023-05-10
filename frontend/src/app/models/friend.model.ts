import { Status } from "./status.model";

export interface Friend {
    username: string;
    avatarUrl?: string;
    intraId?: number;
	status?: Status;
}