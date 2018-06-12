import { User } from "../user.entity";

export interface TokenService {

    createToken(user: User): any;
}