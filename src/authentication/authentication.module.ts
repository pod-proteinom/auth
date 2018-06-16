import { Module } from "@nestjs/common";
import { UsersModule } from "users/users.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthentificationModuleProviders } from "./authentification.providers";

@Module({
    imports: [UsersModule],
    controllers: [AuthenticationController],
    providers: AuthentificationModuleProviders
})
export class AuthenticationModule {

}