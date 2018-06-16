import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaveImageServiceToken, TransformImageServiceToken } from "../constants";
import { CreateImageDto } from "../dto/create-image.dto";
import { Image } from "../image.entity";
import { ImagesService } from "./images.service";
import { SaveImageService } from "./save-image.service";
import { TransformImageService } from "./transform-image.service";

@Injectable()
export class PodsImagesService implements ImagesService {
    private readonly transformImageService: TransformImageService;
    private readonly saveImageService: SaveImageService;
    private readonly imageRepository: Repository<Image>;

    constructor(@Inject(TransformImageServiceToken) transformImageService: TransformImageService,
                @Inject(SaveImageServiceToken) saveImageService: SaveImageService,
                @InjectRepository(Image) imageRepository: Repository<Image>) {
        this.transformImageService = transformImageService;
        this.saveImageService = saveImageService;
        this.imageRepository = imageRepository;
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
 
    async uploadImage(image: Express.Multer.File): Promise<Image> {
        const createImageFilesDto = await this.transformImageService.transform(image);
        const savedImageOnLocalDrive = await this.saveImageService.save(createImageFilesDto);
        return await this.create(savedImageOnLocalDrive);
    }

    async create(image: CreateImageDto): Promise<Image> {
        const createdImage = await this.imageRepository.create(image);
        return await this.imageRepository.save(createdImage);
    }
}