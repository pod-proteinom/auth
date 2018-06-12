import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { User } from "../user.entity";
import { TokenService } from "./token.service";
import { ConfigService } from "config/config.service";

@Injectable()
export class JwtTokenService implements TokenService {

    constructor(private readonly config: ConfigService) {} 

    createToken(user: User): any {
        const payload = { id: user.id, email: user.email };
        const jwtConfig = this.config.getJwtConfiguration();
        return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    }
}