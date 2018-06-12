import { User } from "users/user.entity";

export interface AuthenticationService {
    validateUser(payload: any): Promise<User>;
}