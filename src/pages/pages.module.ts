import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Page } from "./page.entity";
import { PagesController } from "./pages.controller";
import { PagesModuleProviders } from "./pages.providers";
import { ImagesModule } from "images/images.module";

@Module({
    imports: [TypeOrmModule.forFeature([Page]), ImagesModule],
    controllers: [PagesController],
    providers: PagesModuleProviders
})
export class PagesModule {
    static forRoot(providers = []): DynamicModule {
        return {
          module: PagesModule,
          providers: providers,
          exports: providers,
        };
    }
}