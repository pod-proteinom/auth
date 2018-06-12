import { DynamicModule, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersModuleProviders } from "./users.providers";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: UsersModuleProviders
})
export class UsersModule {
    static forRoot(providers = []): DynamicModule {
        return {
          module: UsersModule,
          providers: providers,
          exports: providers,
        };
    }
}