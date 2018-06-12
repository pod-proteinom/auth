import { PasswordService } from "./password.service";
import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CryptoPasswordService implements PasswordService {
    
    async cipher(password: string): Promise<any> {
        const salt = await this.getSalt();
        const hash = await this.cipherPassword(password, salt);
        return {salt, hash};
    }

    private async getSalt(): Promise<any> {
        const randomBytes = await crypto.randomBytes(16);
        return randomBytes.toString('hex');
    }

    private async cipherPassword(password:string, salt:string): Promise<any> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, 512, 'sha512', (err, derivedKey) => {
                if(err) {
                    return reject(err);
                }
                resolve(derivedKey.toString('hex'));
            });
        });
    }

}