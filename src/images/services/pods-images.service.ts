import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaveImageServiceToken, TransformImageServiceToken } from "../constants";
import { CreateImageDto } from "../dto/create-image.dto";
import { Image } from "../image.entity";
import { ImagesService } from "./images.service";
import { SaveImageService } from "./save-image.service";
import { TransformImageService } from "./transform-image.service";
import { ImageDto } from "../dto/image.dto";
import { CreateImageFilesDto } from "../dto/create-files.dto";
import { CreateImageFileDto } from "../dto/create-file.dto";
import { ConfigService } from "config/services/config.service";
import { ConfigServiceToken } from "config/constants";

@Injectable()
export class PodsImagesService implements ImagesService {
    private readonly transformImageService: TransformImageService;
    private readonly saveImageService: SaveImageService;
    private readonly imageRepository: Repository<Image>;
    private readonly configService: ConfigService;

    constructor(@Inject(TransformImageServiceToken) transformImageService: TransformImageService,
                @Inject(SaveImageServiceToken) saveImageService: SaveImageService,
                @InjectRepository(Image) imageRepository: Repository<Image>,
                @Inject(ConfigServiceToken) configService: ConfigService) {
        this.transformImageService = transformImageService;
        this.saveImageService = saveImageService;
        this.imageRepository = imageRepository;
        this.configService = configService;
    }

    async findImageByFilename(filename: string): Promise<Image> {
        return await this.imageRepository.findOne({ filename });
    }

    async findImageById(id: string): Promise<Image> {
        return await this.imageRepository.findOne({id});
    }
    
    async findAll(): Promise<Image[]> {
        return await this.imageRepository.find({});
    }
 
    // TODO move this method to a different class like UploadImageService
    async uploadImage(image: Express.Multer.File): Promise<ImageDto> {
        const createImageFilesDto = await this.transformImageService.transform(image);
        const savedImageOnLocalDrive = await this.saveImageService.save(createImageFilesDto);

        let imageDto = new ImageDto();
        // TODO add width & height of original image to CreateImageDto to prevent such mess
        imageDto.html = this.generateImageTag(createImageFilesDto.original, savedImageOnLocalDrive);
        return imageDto;
    }

    generateImageTag(originalImage: CreateImageFileDto, savedImages: CreateImageDto): String {
        const imagePrefix = this.configService.getImagePrefix();
        const originalImageUrl = imagePrefix + savedImages.original;
        const largeImageUrl = imagePrefix + savedImages.large;
        const mediumImageUrl = imagePrefix + savedImages.medium;
        const thumbnailImageUrl = imagePrefix + savedImages.thumbnail;
        const srcset = `${largeImageUrl} 1024w, ${thumbnailImageUrl} 300w, ${mediumImageUrl} 768w, ${originalImageUrl} ${originalImage.width}w`
        return `<img src='${originalImageUrl}' title='' alt='' width='750' height='265' class='alignnone size-large' srcset='${srcset}' sizes='(max-width: 750px) 100vw, 750px'/>`
    }

    async create(image: CreateImageDto): Promise<Image> {
        const createdImage = await this.imageRepository.create(image);
        return await this.imageRepository.save(createdImage);
    }
}