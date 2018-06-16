import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from 'authentication/authentication.module';
import { ImagesModule } from 'images/images.module';
import { PagesModule } from 'pages/pages.module';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthenticationModule, UsersModule, 
    ImagesModule, PagesModule],
  exports: [AppModule]
})
export class AppModule {
}