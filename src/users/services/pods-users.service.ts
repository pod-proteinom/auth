import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PasswordServiceToken, TokenServiceToken } from "../constants";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../user.entity";
import { PasswordService } from "./password.service";
import { UsersService } from "./users.service";
import { TokenService } from "./token.service";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class PodsUsersService implements UsersService {

    private readonly userRepository: Repository<User>;
    private readonly passwordService: PasswordService;
    private readonly tokenService: TokenService;

    constructor(@InjectRepository(User) userRepository: Repository<User>,
                @Inject(PasswordServiceToken) passwordService: PasswordService,
                @Inject(TokenServiceToken) tokenService: TokenService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    
    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email});
    }

    async createUser(user: CreateUserDto): Promise<UserDto> {
        const hashAndSalt = await this.passwordService.cipher(user.password);
        const createUserDto: CreateUserDto = Object.assign({}, user, hashAndSalt);
        const newUser = await this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(newUser);

        const token = this.tokenService.createToken(savedUser);
        return {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            token
        };
    }
}