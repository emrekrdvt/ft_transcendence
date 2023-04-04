import { HttpService } from '@nestjs/axios';
import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';
import { PrismaClient } from '@prisma/client';


const UID=process.env.UID;
const SECRET=process.env.SECRET;
const REDIRECT_URI=process.env.REDIRECT_URI;
const prisma = new PrismaClient();
@Injectable()
export class UserService {

    constructor(private readonly httpService: HttpService){}


    async getIntraToken(cdt: string)
    {
        try {
            const data =  {
                grant_type: 'authorization_code',
                client_id: UID,
                client_secret: SECRET,
                code: cdt,
                redirect_uri: REDIRECT_URI,
            };
            let response = await firstValueFrom(this.httpService.post('https://api.intra.42.fr/oauth/token', data));
            return response.data;

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
                'Authorization' : `Bearer ${theCode.access_token}`
            }
        }).pipe(map(response => response.data)));
        return res;
       }
       catch {
            console.log ("anannn1");
             //return new HttpException('getCode ERROR', 500);
       }
    }

    async addUser(userData: any)
    {
        try {
            //prisma ile kayıt
            console.log(userData);

        }
        catch{
            return new HttpException('addUser ERROR', 500);
        }
    }

    async login(code: string)
    {
        try {
            const token = await this.getIntraToken(code);
            const userData = await this.getCode(token);
            const user = Object(await this.addUser(userData));
            return user;
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


