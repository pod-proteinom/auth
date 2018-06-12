import { UsersServiceToken, PasswordServiceToken } from "./constants";
import { PodsUsersService } from "./services/pods-users.service";
import { CryptoPasswordService } from "./services/crypto-password.service";

const PodsUsersServiceProvider = {
    provide: UsersServiceToken,
    useClass: PodsUsersService
}

const CryptoPasswordServiceProvider = {
    provide: PasswordServiceToken,
    useClass: CryptoPasswordService
}

export const UsersModuleProviders = [
    PodsUsersServiceProvider,
    CryptoPasswordServiceProvider
];