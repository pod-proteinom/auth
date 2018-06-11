import { PodsImagesService } from "./services/pods-images.service";
import { ImagesServiceToken, TransformImageServiceToken, SaveImageServiceToken, ImageNamingServiceToken } from "./constants";
import { TinifyTransformImageService } from "./services/tinify-transform-image.service";
import { SaveImageToLocalDriveService } from "./services/save-image-to-local-drive.service";
import { ImageSizeNamingService } from "./services/image-size-naming.service";

const PodsImagesServiceProvider = {
    provide: ImagesServiceToken,
    useClass: PodsImagesService
};

const TinifyTransformImageServiceProvider = {
    provide: TransformImageServiceToken,
    useClass: TinifyTransformImageService
}

const SaveImageToLocalDriveServiceProvider = {
    provide: SaveImageServiceToken,
    useClass: SaveImageToLocalDriveService
}

const ImageSizeNamingServiceProvider = {
    provide: ImageNamingServiceToken,
    useClass: ImageSizeNamingService
}

export const ImagesModuleProviders = [
    PodsImagesServiceProvider,
    TinifyTransformImageServiceProvider,
    SaveImageToLocalDriveServiceProvider,
    ImageSizeNamingServiceProvider
];