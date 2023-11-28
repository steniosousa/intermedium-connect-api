import { INestApplication } from '@nestjs/common';
import { configureClassValidator } from './configureClassValidator';
import { configureSwagger } from './configureSwagger';
import { configureCors } from './configureCors';

export function configureApp(app: INestApplication) {
  configureCors(app);
  configureSwagger(app);
  configureClassValidator(app);
  
}
