import { UsersServiceToken, PasswordServiceToken, TokenServiceToken } from "./constants";
import { PodsUsersService } from "./services/pods-users.service";
import { CryptoPasswordService } from "./services/crypto-password.service";
import { JwtTokenService } from "./services/jwt-token.service";

const PodsUsersServiceProvider = {
    provide: UsersServiceToken,
    useClass: PodsUsersService
}

const CryptoPasswordServiceProvider = {
    provide: PasswordServiceToken,
    useClass: CryptoPasswordService
}

const JwtTokenServiceProvider = {
    provide: TokenServiceToken,
    useClass: JwtTokenService
}

export const UsersModuleProviders = [
    PodsUsersServiceProvider,
    CryptoPasswordServiceProvider,
    JwtTokenServiceProvider
];