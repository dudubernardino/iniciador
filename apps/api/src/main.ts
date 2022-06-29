import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClientModule } from './clients/client.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiConfig = new DocumentBuilder()
    .setTitle('Iniciador API - Clients')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const clientsDocument = SwaggerModule.createDocument(app, apiConfig, {
    include: [ClientModule],
  });
  SwaggerModule.setup('api/clients', app, clientsDocument);

  await app.listen(3000);
}
bootstrap();
