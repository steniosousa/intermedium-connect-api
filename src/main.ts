import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  configureApp(app);

  const port = process.env.PORT ?? 8081;
  await app.listen(port);
}
bootstrap();
