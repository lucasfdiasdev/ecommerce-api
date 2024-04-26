import { config } from 'dotenv';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { TransformationInterceptor } from './responseInterceptor';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is listening on port ${process.env.PORT || 8080}`);
  });
}
bootstrap();
