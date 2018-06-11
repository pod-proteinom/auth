import { CreateImageFilesDto } from "../dto/create-files.dto";
import { CreateImageDto } from "../dto/create-image.dto";

export interface SaveImageService {

    save(images: CreateImageFilesDto): Promise<CreateImageDto>;
}