import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const authConfig = new DocumentBuilder()
    .setTitle('Iniciador API - Auth')
    .setVersion('1.0')
    .build();

  const clientsDocument = SwaggerModule.createDocument(app, authConfig, {
    include: [AuthModule],
  });
  SwaggerModule.setup('auth', app, clientsDocument);

  await app.listen(3001);
}
bootstrap();
