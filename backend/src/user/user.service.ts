import { HttpService } from '@nestjs/axios';
import {  HttpException, Injectable } from '@nestjs/common';
import { catchError, first, firstValueFrom, lastValueFrom, map, throwError } from 'rxjs';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';


const UID=process.env.UID;
const SECRET=process.env.SEC;
const REDIRECT_URI=process.env.REDIRECT_URI;
const prisma = new PrismaClient();
@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService){}

    async getIntraToken(cdt: any)
    {
        console.log(cdt);
            try {
            const data =  {
                grant_type: 'authorization_code',
                client_id: UID,
                client_secret: SECRET,
                code: cdt,
                redirect_uri: REDIRECT_URI,
            };
            const response = await firstValueFrom(this.httpService.post('https://api.intra.42.fr/oauth/token', data).pipe(map(response => response.data)).pipe(catchError((err) => {
                console.error('HTTP Error:', err.message);
                return throwError('HTTP Error Occurred');
              })));
            return response;
        }
        catch
        {
            return new HttpException('getIntraToken ERROR', 500);
        }
   }

    async getCode(theCode)
    {
       try {
        const res = await lastValueFrom(this.httpService.get('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization' : 'Bearer '+ theCode.access_token
            }
        }).pipe(map(response => response.data)));
        return res;
   
       }
       catch {
             return new HttpException('getCode ERROR', 500);
       }
    }

    async login(code: string)
    {
        try {
            const token = await this.getIntraToken(code);
            const userData = await this.getCode(token);
            console.log(userData.login);
            fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        catch {
            return new HttpException('LOGIN Error', 500);
        }
    }

    async getUsers(id: number)
    {
        try {
            const users = await prisma.user.findMany({
                where: {
                  id: {
                    gt: id,
                  },
                },
              })
              return users;
        }
        catch {
            return new HttpException('Error', 500);
        }
    }

}


