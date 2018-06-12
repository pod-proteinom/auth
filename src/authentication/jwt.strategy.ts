import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from 'config/config.service';
import { AuthenticationService } from './services/authentification.service';
import { AuthentificationServiceToken } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly authentificationService: AuthenticationService;

    constructor(@Inject(AuthentificationServiceToken) authentificationService: AuthenticationService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY
        });
        this.authentificationService = authentificationService;
    }

    async validate(payload, done: Function) {
        const user = await this.authentificationService.validateUser(payload);
        console.log(user)
        if (!user) {
          return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }

}