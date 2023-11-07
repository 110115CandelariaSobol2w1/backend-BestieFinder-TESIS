import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Reemplaza con el origen de tu frontend
  });

  await app.listen(3000);
}
bootstrap();
