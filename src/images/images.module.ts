import { Module, DynamicModule } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesModuleProviders } from "./images.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./image.entity";
import { ConfigModule } from "config/config.module";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Image])],
    controllers: [ImagesController],
    providers: ImagesModuleProviders,
    exports: ImagesModuleProviders
})
export class ImagesModule {
    static forRoot(providers = []): DynamicModule {
        return {
          module: ImagesModule,
          providers: providers,
          exports: providers,
        };
    }
}