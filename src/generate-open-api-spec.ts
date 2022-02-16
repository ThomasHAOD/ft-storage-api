import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs'

async function generateOpenApiSpec() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FT GCS API')
    .setDescription('An API for interacting with Google Cloud Storage')
    .setVersion('1.0')
    .build();
  const document = JSON.stringify(SwaggerModule.createDocument(app, config));

  fs.writeFileSync('openApi2Spec.json', document);

}
generateOpenApiSpec();
