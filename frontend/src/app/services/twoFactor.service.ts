import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable()
export class TwoFactorAuthService {

	constructor(private http: HttpClient) { }
	private baseUrl = environment.address + '/twoAuth';

	generateQRCodeAndShow(userName: string) {
		return this.http.get<{ qrCode: string }>(`${this.baseUrl}/qrcode/${userName}`);
	}

	verifyTwoFactorAuth(token: string, userName: string) {
		return this.http.post<{ isValid: boolean }>(`${this.baseUrl}/verify`, { token, userName });
	}

	checkTwoFactorAuth(userName: string) {
		return this.http.get<{ twoFactor: boolean }>(`${this.baseUrl}/check/${userName}`);
	}
}