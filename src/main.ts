import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Open API (Swagger)
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`Last Updated: ${process.env.APP_BUILD_DATE}`)
    .setVersion(process.env.APP_VERSION)
    .addTag('Raking-FII')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
