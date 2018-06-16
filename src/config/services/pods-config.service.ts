import * as dotenv from 'dotenv';
import * as path from 'path';
import * as Joi from 'joi';
import { ConfigService } from './config.service';

export interface EnvConfig {
    [prop: string]: string;
}

export class PodsConfigService implements ConfigService {
    private readonly envConfig: EnvConfig;
 
    constructor(filename: string) {
        const config = dotenv.config({path: path.join(process.cwd(), filename)});
        this.envConfig = this.validateInput(config.parsed);
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
          NODE_ENV: Joi.string()
            .valid(['development', 'production', 'test'])
            .default('development'),
          PORT: Joi.number().default(3000),
          TINIFY_API_KEY: Joi.string(),
          JWT_SECRET_KEY: Joi.string()
        });
    
        const { error, value: validatedEnvConfig } = Joi.validate(
          envConfig,
          envVarsSchema,
        );
        if (error) {
          throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    getTinifyApiKey(): string {
      return this.envConfig.TINIFY_API_KEY;
    }

    getTinifyResizeConfig(): any {
      return {
        thumbnail: { method: 'scale', width: 300 },
        medium: { method: 'scale', width: 768 },
        large: { method: 'scale', width: 1024 },
        featured: { method: 'thumb', width: 360, height: 240 }
      }
    }

    getPublicDirectory(): string {
      return path.join(process.cwd(), 'public');
    }

    getImageDirectory(): string {
      return path.join(this.getPublicDirectory(), 'images');
    }

    getJwtConfiguration(): any {
      return {
        secretKey: this.envConfig.JWT_SECRET_KEY,
        expiresIn: 3600
      };
    }
}