import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FT GCS API')
    .setDescription('An API for interacting with Google Cloud Storage')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(document);


  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(4001);
}
bootstrap();
