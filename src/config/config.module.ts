import { Module } from "@nestjs/common";
import { ConfigService } from "./services/config.service";
import { ConfigServiceToken } from "./constants";
import { PodsConfigService } from "./services/pods-config.service";

@Module({
    providers: [{
        provide: ConfigServiceToken,
        useValue: new PodsConfigService(`${process.env.NODE_ENV}.env`)
    }],
    exports: [ConfigServiceToken]
})
export class ConfigModule {

}