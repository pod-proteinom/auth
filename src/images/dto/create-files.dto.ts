import { CreateImageFileDto } from "./create-file.dto";

export class CreateImageFilesDto {
    original: CreateImageFileDto
    thumbnail: CreateImageFileDto
    medium: CreateImageFileDto
    large: CreateImageFileDto
    featured: CreateImageFileDto

    constructor(images, names, sizes) {
        const [original, thumbnail] = images;
        const [originalName, thumbnailName] = names;
        const [originalSize, thumbnailSize] = sizes;
        this.original = new CreateImageFileDto(original, originalName, originalSize);
        this.thumbnail = new CreateImageFileDto(thumbnail, thumbnailName, thumbnailSize);
    }
}