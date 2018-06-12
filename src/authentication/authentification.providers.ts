import { AuthentificationServiceToken } from "./constants";
import { PodsAuthenticationService } from "./services/pods-authentification.service";
import { JwtStrategy } from "./jwt.strategy";

const AuthentificationServiceProvider = {
    provide: AuthentificationServiceToken,
    useClass: PodsAuthenticationService
}

export const AuthentificationModuleProviders = [
    AuthentificationServiceProvider,
    JwtStrategy
];