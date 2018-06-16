import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passport from 'passport-jwt';
import { AuthentificationServiceToken } from './constants';
import { AuthenticationService } from './services/authentification.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(passport.Strategy) {
    private readonly authentificationService: AuthenticationService;

    constructor(@Inject(AuthentificationServiceToken) authentificationService: AuthenticationService) {
        super({
            jwtFromRequest: passport.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY
        });
        this.authentificationService = authentificationService;
    }

    async validate(payload, done: Function) {
        const user = await this.authentificationService.validateUser(payload);
        if (!user) {
          return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }

}