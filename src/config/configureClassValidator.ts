import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configureClassValidator(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}
