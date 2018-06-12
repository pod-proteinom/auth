import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PasswordServiceToken } from "../constants";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../user.entity";
import { PasswordService } from "./password.service";
import { UsersService } from "./users.service";

@Injectable()
export class PodsUsersService implements UsersService {

    private readonly userRepository: Repository<User>;
    private readonly passwordService: PasswordService;

    constructor(@InjectRepository(User) userRepository: Repository<User>,
                @Inject(PasswordServiceToken) passwordService: PasswordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }
    
    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email});
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({username});
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const hashAndSalt = await this.passwordService.cipher(user.password);
        const createUserDto: CreateUserDto = Object.assign({}, user, hashAndSalt);
        const newUser = await this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }
}