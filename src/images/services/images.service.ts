import { Image } from "../image.entity";
import { CreateImageDto } from "../dto/create-image.dto";

export interface ImagesService {
    
    findImageByFilename(filename: string): Promise<Image>;
    
    uploadImage(image: Express.Multer.File): Promise<Image>;
    
    create(image: CreateImageDto): Promise<Image>;

    findAll(): Promise<Image[]>;
}