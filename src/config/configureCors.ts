import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configureCors(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}
