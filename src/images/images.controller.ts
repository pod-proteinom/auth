import { ConflictException, Controller, FileInterceptor, Inject, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImagesServiceToken } from "./constants";
import { ImagesService } from "./services/images.service";

@Controller('images')
export class ImagesController {
    private readonly imagesService: ImagesService;

    constructor(@Inject(ImagesServiceToken) imagesService: ImagesService) {
        this.imagesService = imagesService;
    };

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async upload(@UploadedFile() image) {
        const filename = image.originalname;
        const isImageExist = await this.imagesService.findImageByFilename(filename);
        if(isImageExist) {
            throw new ConflictException(`File ${filename} already exists`);
        }
        return await this.imagesService.uploadImage(image);
    }
}