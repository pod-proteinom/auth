import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { User } from "../user.entity";
import { TokenService } from "./token.service";

@Injectable()
export class JwtTokenService implements TokenService {

    createToken(user: User): any {
        const payload = { id: user.id, email: user.email };
        return jwt.sign(payload, 'secretKey', { expiresIn: 3600 });
    }
}