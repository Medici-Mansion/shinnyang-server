import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { EmojiLogger } from './common/emoji.logger';
import { HttpExceptionFilter } from './common/exceiption-filter/http-exceiption.filter';
async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  });
  app.enableCors();
  app.use(helmet());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Shinnyang Project')
    .setDescription('The Shinnyang Project description')
    .setVersion('1.0')
    .addTag('cat')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT, () => {
    new Logger().log(`SERVER RUNNING ON : ${PORT}`);
  });
}
bootstrap();
