import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'config/config.module';
import { ImagesModule } from 'images/images.module';
import { UsersModule } from 'users/users.module';
import { AuthenticationModule } from 'authentication/authentication.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forRoot(), AuthenticationModule, UsersModule, ImagesModule]
})
export class AppModule {
}