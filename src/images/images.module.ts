import { Module, DynamicModule } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesModuleProviders } from "./images.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Image } from "./image.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    controllers: [ImagesController],
    providers: ImagesModuleProviders
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