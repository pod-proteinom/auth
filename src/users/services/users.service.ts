import { User } from "../user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserDto } from "../dto/user.dto";

export interface UsersService {

    findUserByEmail(email: string): Promise<User>;

    createUser(user: CreateUserDto): Promise<UserDto>;
}