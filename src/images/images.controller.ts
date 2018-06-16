import { ConflictException, Controller, FileInterceptor, Inject, Post, UploadedFile, UseGuards, UseInterceptors, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ImagesServiceToken } from "./constants";
import { ImagesService } from "./services/images.service";

@Controller('images')
export class ImagesController {
    private readonly imagesService: ImagesService;

    constructor(@Inject(ImagesServiceToken) imagesService: ImagesService) {
        this.imagesService = imagesService;
    };

    @Get()
    async getImages() {
        return await this.imagesService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
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