import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {

	nicknameInput: string = '';
	aboutInput: string = '';
	reader: FileReader = new FileReader();
	constructor(private userService: UserService) { }

	uploadPhoto = (user: User) => {
		if (this.reader.result === null) return;
		user.avatarUrl = this.reader.result as string;
		this.userService.updateUser(user, () => {
			return { avatarUrl: this.reader.result as string };
		}, this.reader.result as string)
		this.userService.setUser(user);
		this.reader.onerror = (error) => {
			console.log('Error: ', error);
		};
	};

	updateNickname = (user: User) => {
		user.nickname = this.nicknameInput;
		this.userService.updateUser(user, () => {
			return { nickname: this.nicknameInput };
		}, this.nicknameInput)
		this.userService.setUser(user);
	};

	updateAbout = (user: User) => {
		user.about = this.aboutInput;
		this.userService.updateUser(user, () => {
			return { about: this.aboutInput };
		}, this.aboutInput)
		this.userService.setUser(user);
	};

	updateTwoFactor = (user: User) => {
		user.twoFactor = !user.twoFactor;
		this.userService.updateUser(user, () => {
			return { twoFactor: user.twoFactor };
		}, user.twoFactor)
		this.userService.setUser(user);
	};

	takeInput = (event: any, type: string) => {
		if (type === 'photo') {
			this.reader.readAsDataURL(event.target.files[0]);
		}
		else if (type === 'nickname') {
			this.nicknameInput = event.target.value;
		}
		else if (type === 'about') {
			this.aboutInput = event.target.value;
		}
	};
}