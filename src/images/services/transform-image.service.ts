import { CreateImageFilesDto } from "../dto/create-files.dto";

export interface TransformImageService {

    transform(originalImage: Express.Multer.File): Promise<CreateImageFilesDto>;
}