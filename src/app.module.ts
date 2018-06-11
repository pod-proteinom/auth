import { Module } from '@nestjs/common';
import { CustomModule } from 'custom/custom.module';
import { ConfigModule } from 'config/config.module';
import { ImagesModule } from 'images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), ImagesModule]
})
export class AppModule {
}