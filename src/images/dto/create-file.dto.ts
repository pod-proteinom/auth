export class CreateImageFileDto {
    container: any
    filename: string
    width: number
    height: number

    constructor(container: any, filename: string, size: any) {
        this.container = container;
        this.filename = filename;
        this.width = size.width;
        this.height = size.height;
    }
}