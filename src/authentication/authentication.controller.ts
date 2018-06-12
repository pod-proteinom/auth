import { Body, Controller, HttpCode, Inject, Post, UnauthorizedException } from "@nestjs/common";
import { PasswordServiceToken, UsersServiceToken, TokenServiceToken } from "users/constants";
import { UserDto } from "users/dto/user.dto";
import { PasswordService } from "users/services/password.service";
import { UsersService } from "users/services/users.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { TokenService } from "users/services/token.service";

@Controller('users')
export class AuthenticationController {

    private readonly usersService: UsersService;
    private readonly passwordService: PasswordService;
    private readonly tokenService: TokenService;

    constructor(@Inject(UsersServiceToken) usersService: UsersService,
                @Inject(PasswordServiceToken) passwordService: PasswordService,
                @Inject(TokenServiceToken) tokenService: TokenService) {
        this.usersService = usersService;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserDto> {
        const username = loginUserDto.username;
        const user = await this.usersService.findUserByUsername(username);
        if(!user) {
            throw new UnauthorizedException('The username or password is incorrect.');
        }
        const password = loginUserDto.password;
        const isPasswordValid = await this.passwordService.verify(password, user.salt, user.hash);
        if(!isPasswordValid) {
            throw new UnauthorizedException('The username or password is incorrect.');
        }
        const token = await this.tokenService.createToken(user);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            token
        }
    }
}