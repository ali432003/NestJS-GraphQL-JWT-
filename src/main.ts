import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors
        .map((error) => Object.values(error.constraints!).join(', '))
          .join('; ');
        return new BadRequestException(message);
      },
    }),
  );
   // Enable CORS
   app.enableCors({
    origin: 'https://studio.apollographql.com', // Allow Apollo Studio
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(4000);
  console.log('Running on http://localhost:4000/graphql')
}
bootstrap();
