import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClientModule } from './clients/client.module';
import { ShoeModule } from './shoes/shoes.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const clientsConfig = new DocumentBuilder()
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

  const clientsDocument = SwaggerModule.createDocument(app, clientsConfig, {
    include: [ClientModule],
  });
  SwaggerModule.setup('api/clients', app, clientsDocument);

  const shoesConfig = new DocumentBuilder()
    .setTitle('Iniciador API - Shoes')
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

  const shoesDocument = SwaggerModule.createDocument(app, shoesConfig, {
    include: [ShoeModule],
  });
  SwaggerModule.setup('api/shoes', app, shoesDocument);

  await app.listen(3000);
}
bootstrap();
