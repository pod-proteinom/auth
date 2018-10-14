import * as dotenv from 'dotenv';
import * as path from 'path';
import * as Joi from 'joi';

export interface EnvConfig {
    [prop: string]: string;
}

export interface ConfigService {

    getTinifyApiKey(): string;

    getTinifyResizeConfig(): any;

    getPublicDirectory(): string;

    getImageDirectory(): string;

    getJwtConfiguration(): any;

    getImagePrefix(): string;
}