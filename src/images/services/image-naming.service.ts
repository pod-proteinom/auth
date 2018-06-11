export interface ImageNamingService {
    
    resolve(filename: string, sizes: object[]): string[];
}