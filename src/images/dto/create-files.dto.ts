import { CreateImageFileDto } from "./create-file.dto";

export class CreateImageFilesDto {
    original: CreateImageFileDto
    thumbnail: CreateImageFileDto
    medium: CreateImageFileDto
    large: CreateImageFileDto
    featured: CreateImageFileDto

    constructor(images, names, sizes) {
        const [original, thumbnail, medium, large, featured] = images;
        const [originalName, thumbnailName, mediumName, largeName, featuredName] = names;
        const [originalSize, thumbnailSize, mediumSize, largeSize, featuredSize] = sizes;
        this.original = new CreateImageFileDto(original, originalName, originalSize);
        this.thumbnail = new CreateImageFileDto(thumbnail, thumbnailName, thumbnailSize);
        this.medium = new CreateImageFileDto(medium, mediumName, mediumSize);
        this.large = new CreateImageFileDto(large, largeName, largeSize);
        this.featured = new CreateImageFileDto(featured, featuredName, featuredSize);
    }
}