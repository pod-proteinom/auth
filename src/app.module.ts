import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'config/config.module';
import { ImagesModule } from 'images/images.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), ImagesModule, UsersModule]
})
export class AppModule {
}