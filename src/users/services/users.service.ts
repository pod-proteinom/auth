import { User } from "../user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

export interface UsersService {

    findUserByEmail(email: string): Promise<User>;

    createUser(createUserDto: CreateUserDto): Promise<User>;
}