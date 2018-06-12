import { Injectable, Inject } from "@nestjs/common";
import { AuthenticationService } from "./authentification.service";
import { User } from "users/user.entity";
import { UsersServiceToken } from "users/constants";
import { UsersService } from "users/services/users.service";

@Injectable()
export class PodsAuthenticationService implements AuthenticationService {

    private readonly usersService: UsersService;

    constructor(@Inject(UsersServiceToken) usersService: UsersService) {
        this.usersService = usersService;
    }

    async validateUser(payload: any): Promise<User> {
        const email = payload.email;
        return this.usersService.findUserByEmail(email);
    }
}