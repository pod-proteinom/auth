import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthentificationModuleProviders } from "./authentification.providers";
import { UsersModule } from "users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [AuthenticationController],
    providers: AuthentificationModuleProviders
})
export class AuthenticationModule {

}