import { ImagesServiceToken } from "images/constants";
import { CustomService } from "./custom.service";

const DefaultImagesServiceProvider = {
    provide: ImagesServiceToken,
    useClass: CustomService
};

export const CustomModuleProviders = [
    DefaultImagesServiceProvider
];