export class CreateImageDto {
    title: string
    alt: string
    filename: string
    original: string
    thumbnail: string
    medium: string
    large: string
    featured: string

    constructor(title: string, alt: string, filename: string, imageFiles: string[]) {
        this.title = title;
        this.alt = alt;
        this.filename = filename;
        const [original, thumbnail, medium, large, featured] = imageFiles;
        this.original = original;
        this.thumbnail = thumbnail;
        this.medium = medium;
        this.large = large;
        this.featured = featured;
    }
}