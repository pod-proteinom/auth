import { Controller, Post, HttpCode, Body } from "@nestjs/common";
import { User } from "users/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('users')
export class AuthenticationController {

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
        
        return await new User();
    }
}