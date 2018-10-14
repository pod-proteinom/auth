import { Image } from "../image.entity";
import { CreateImageDto } from "../dto/create-image.dto";
import { ImageDto } from "../dto/image.dto";

export interface ImagesService {
    
    findImageByFilename(filename: string): Promise<Image>;
    
    findImageById(id: string): Promise<Image>;
    
    findAll(): Promise<Image[]>;

    uploadImage(image: Express.Multer.File): Promise<ImageDto>;
    
    create(image: CreateImageDto): Promise<Image>;
}