import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    async hashPassword(password: string)
    {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        console.log(hash);
        return hash;
    }

    async comparePassword(password: string, hash: string): Promise<boolean>
    {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
}