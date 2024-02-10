import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from 'config';
import * as bodyParser from 'body-parser'; // Importar body-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: 'Infinity' }));
  app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true }));
  
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
