import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as YAML from 'yaml';

async function generateOpenApiSpec() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FT GCS API')
    .setDescription('An API for interacting with Google Cloud Storage')
    .setVersion('1.0')
    .build();
  const json = JSON.stringify(SwaggerModule.createDocument(app, config));

  fs.writeFileSync('openApi3Spec.json', json);
}
generateOpenApiSpec();
