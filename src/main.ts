import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Shinnyang Project')
    .setDescription('The Shinnyang Project description')
    .setVersion('1.0')
    .addTag('cat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

}
bootstrap();
