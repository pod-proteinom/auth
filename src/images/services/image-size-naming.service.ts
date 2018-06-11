import { Injectable } from "@nestjs/common";
import { ImageNamingService } from "./image-naming.service";

@Injectable()
export class ImageSizeNamingService implements ImageNamingService {

    resolve(filename: string, sizes: any[]): string[] {
        const baseName = this.getFileBaseName(filename);
        const type = this.getFileType(filename);
        
        return this.resolveNames(sizes, baseName, type);
    }

    private getFileBaseName(filename: string): string {
        const dotPosition = filename.indexOf('.');
        return filename.substr(0, dotPosition);
    }

    private getFileType(filename: string): string {
        const dotPosition = filename.indexOf('.');
        return filename.substr(dotPosition, filename.length);
    }

    private resolveNames(sizes: any[], baseName: string, type: string): string[] {
        return sizes.map((size, index) => {
            const isOriginal = index === 0;
            if(isOriginal) {
                return baseName + type;
            } else {
                return baseName + `-${size.width}x${size.height}` + type;
            }
        });
    }
} 