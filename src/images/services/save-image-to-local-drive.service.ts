import { Injectable } from "@nestjs/common";
import { ConfigService } from "config/config.service";
import * as fs from 'fs-extra';
import * as path from 'path';
import { CreateImageFilesDto } from "../dto/create-files.dto";
import { CreateImageDto } from "../dto/create-image.dto";
import { SaveImageService } from "./save-image.service";

@Injectable()
export class SaveImageToLocalDriveService implements SaveImageService {
    
    constructor(private readonly config: ConfigService) {}
    
    async save(images: CreateImageFilesDto): Promise<CreateImageDto> {
        const yearFolder = this.getYearFolder();
        const pathToYearFolder = path.join(this.config.getImageDirectory(), yearFolder);
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
        const currentMonth = 0 + (currentDate.getMonth() + 1).toString();
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