export class CreateImageDto {
    title: string
    alt: string
    filename: string
    original: string
    thumbnail: string
    // medium: ImageFileDto
    // large: ImageFileDto
    // featured: ImageFileDto

    constructor(title: string, alt: string, filename: string, imageFiles: string[]) {
        this.title = title;
        this.alt = alt;
        this.filename = filename;
        const [original, thumbnail] = imageFiles;
        this.original = original;
        this.thumbnail = thumbnail;
    }
}