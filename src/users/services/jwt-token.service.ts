import { Injectable, Inject } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { User } from "../user.entity";
import { TokenService } from "./token.service";
import { ConfigService } from "config/services/config.service";
import { ConfigServiceToken } from "config/constants";

@Injectable()
export class JwtTokenService implements TokenService {

    private readonly configService: ConfigService;

    constructor(@Inject(ConfigServiceToken) configService: ConfigService) {
        this.configService = configService;
    } 

    createToken(user: User): any {
        const payload = { id: user.id, email: user.email };
        const jwtConfig = this.configService.getJwtConfiguration();
        return jwt.sign(payload, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
    }
}