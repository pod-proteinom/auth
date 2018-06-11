import { Module } from "@nestjs/common";
import { ImagesModule } from "images/images.module";
import { CustomService } from "./custom.service";
import { CustomModuleProviders } from "./custom.providers";

@Module({
    imports: [ImagesModule.forRoot(CustomModuleProviders)]
})
export class CustomModule {

}