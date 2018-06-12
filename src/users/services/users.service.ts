import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../user.entity";

export interface UsersService {

    findUserByEmail(email: string): Promise<User>;

    findUserByUsername(username: string): Promise<User>;

    createUser(user: CreateUserDto): Promise<User>;
}