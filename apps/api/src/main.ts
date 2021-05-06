import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.enableCors({origin: '*'});

  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: process.env.NODE_ENV === 'development',
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }));

  const config = new DocumentBuilder()
    .setTitle('System4Blue - API')
    .setDescription('The system4blue API description')
    .setVersion(process.env.npm_package_version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
