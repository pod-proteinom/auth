import request from 'supertest';
import { Test } from '@nestjs/testing';
import { ImagesModule } from './../src/images/images.module';
import { ConfigModule } from './../src/config/config.module';
import { AuthenticationModule } from './../src/authentication/authentication.module';
import { INestApplication } from '@nestjs/common';
import { ConfigServiceToken } from '../src/config/constants';
import { UsersModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UsersModuleProviders } from '../src/users/users.providers';
import { User } from '../src/users/user.entity';
import {AppModule} from '../src/app.module';
import { TransformImageServiceToken } from '../src/images/constants';

jest.mock('tinify');

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET /pages', () => {
    return request(app.getHttpServer())
      .get('/pages/slug/help')
      .expect(200);
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
