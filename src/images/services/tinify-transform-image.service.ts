import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from 'config/services/config.service';
import { ConfigServiceToken } from 'config/constants';
import * as tinify from 'tinify';
import { ImageNamingServiceToken } from '../constants';
import { CreateImageFilesDto } from '../dto/create-files.dto';
import { ImageNamingService } from './image-naming.service';
import { TransformImageService } from './transform-image.service';

@Injectable()
export class TinifyTransformImageService implements TransformImageService {

    private readonly configService: ConfigService;
    private readonly imageNamingService: ImageNamingService;

    constructor(@Inject(ConfigServiceToken) configService: ConfigService, 
                @Inject(ImageNamingServiceToken) imageNamingService: ImageNamingService) {
        tinify.key = configService.getTinifyApiKey();
        this.configService = configService;
        this.imageNamingService = imageNamingService;
    }

    async transform(originalImage: Express.Multer.File): Promise<CreateImageFilesDto> {
        const sourceImage = tinify.fromBuffer(originalImage.buffer);
        const optimizedImage = this.optimize(sourceImage);

        const resizeConfig = this.configService.getTinifyResizeConfig();
        const thumbnailImage = this.resize(sourceImage, resizeConfig.thumbnail);
        const mediumImage = this.resize(sourceImage, resizeConfig.medium);
        const largeImage = this.resize(sourceImage, resizeConfig.large);
        const featuredImage = this.resize(sourceImage, resizeConfig.featured);

        const images = [optimizedImage, thumbnailImage, mediumImage, largeImage, featuredImage];
        const sizes = await Promise.all(images.map(this.getSize));
        const names = this.imageNamingService.resolve(originalImage.originalname, sizes);
        return new CreateImageFilesDto(images, names, sizes);
    }

    private optimize(sourceImage) {
        return sourceImage.result();
    }

    private resize(sourceImage, resizeConfig) {
        return sourceImage.resize(resizeConfig).result();
    }

    private async getSize(image): Promise<object> {
        const imageMeta = await image.meta();
        const imageWidthProp = 'image-width';
        const imageHeightProp = 'image-height';
        return {
            width: imageMeta[imageWidthProp],
            height: imageMeta[imageHeightProp]
        };
    }
}