import { PodsPagesService } from "./services/pods-pages.service";
import { PagesServiceToken } from "./constants";

const PodsPagesServiceProvider = {
    provide: PagesServiceToken,
    useClass: PodsPagesService
}

export const PagesModuleProviders = [
    PodsPagesServiceProvider
];