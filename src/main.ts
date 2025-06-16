import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 4000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, '0.0.0.0');
  console.log(`App started on ${port} port`);
}
bootstrap();
