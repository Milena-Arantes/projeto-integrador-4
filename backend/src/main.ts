import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma os dados de entrada para o tipo correto
      whitelist: true, // Remove propriedades não permitidas
      forbidNonWhitelisted: true, // Lança erro se propriedades não permitidas forem encontradas
    }),
  )

  app.enableCors({
    origin: '*', // Libera requisições de qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
