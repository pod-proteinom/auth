import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "config/services/config.service";
import { ConfigServiceToken } from "config/constants";
import * as fs from 'fs-extra';
import * as path from 'path';
import { CreateImageFilesDto } from "../dto/create-files.dto";
import { CreateImageDto } from "../dto/create-image.dto";
import { SaveImageService } from "./save-image.service";

@Injectable()
export class SaveImageToLocalDriveService implements SaveImageService {

    private readonly configService: ConfigService;
    
    constructor(@Inject(ConfigServiceToken) configService: ConfigService) {
        this.configService = configService;
    }
    
    async save(images: CreateImageFilesDto): Promise<CreateImageDto> {
        const yearFolder = this.getYearFolder();
        const pathToYearFolder = path.join(this.configService.getImageDirectory(), yearFolder);
        await this.createFolderIfNotExist(pathToYearFolder);

        const monthFolder = this.getMonthFolder();
        const pathToSaveImages = path.join(pathToYearFolder, monthFolder);
        await this.createFolderIfNotExist(pathToSaveImages);

        const imagesToSave = Object.keys(images).map(imageVersion => {
            const image = images[imageVersion];
            const pathToImage = this.getImagePath(pathToSaveImages, image.filename);
            return image.container.toFile(pathToImage);
        });

        await Promise.all(imagesToSave);

        const imagePrefix = [yearFolder, monthFolder].join('/');
        const imageFiles = Object.keys(images).map(imageVersion => {
            const image = images[imageVersion];
            return [imagePrefix, image.filename].join('/');
        });
        const originalFilename = images.original.filename;
        return new CreateImageDto('', '', originalFilename, imageFiles);
    }

    private getYearFolder(): string {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        return currentYear;
    }

    private getMonthFolder(): string {
        const currentDate = new Date();
        const monthNumber = currentDate.getMonth() + 1;
        console.log(monthNumber)
        const currentMonth = monthNumber < 10 ? 0 + monthNumber.toString() : monthNumber.toString();
        return currentMonth;
    }

    private async createFolderIfNotExist(path: string): Promise<void> {
        try {
            await fs.stat(path);
        } catch(e) {
            if(e.code === 'ENOENT') {
                await fs.mkdir(path);
            } else {
                throw e;
            }
        }
    }

    private getImagePath(pathToFolder: string, filename: string): string {
        return path.join(pathToFolder, filename);
    }
}