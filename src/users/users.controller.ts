import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { TokenServiceToken, UsersServiceToken } from "./constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { TokenService } from "./services/token.service";
import { UsersService } from "./services/users.service";

@Controller('users')
export class UsersController {

    private readonly usersService: UsersService;
    private readonly tokenService: TokenService;

    constructor(@Inject(UsersServiceToken) usersService: UsersService,
                @Inject(TokenServiceToken) tokenService: TokenService) {
        this.usersService = usersService;
        this.tokenService = tokenService;
    }

    @Post()
    async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        const userEmail = createUserDto.email;
        const isUserWithSameEmailExist = await this.usersService.findUserByEmail(userEmail);
        if(isUserWithSameEmailExist) {
            throw new ConflictException(`User with email ${userEmail} already exists`);
        }

        const savedUser = await this.usersService.createUser(createUserDto);
        const token = await this.tokenService.createToken(savedUser);
        return {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            token
        }
    }
}