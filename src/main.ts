import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  const port = process.env.PORT ?? 8081;
  await app.listen(port);
}
bootstrap();
