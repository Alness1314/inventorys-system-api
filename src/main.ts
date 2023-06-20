import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication');

  app.setGlobalPrefix('api');

  //const timeZone = momentTimezone.tz.guess();
  //momentTimezone.tz.setDefault(timeZone);

  //initSwagger(app);
  const config = new DocumentBuilder()
    .setTitle('API-SAI360')
    .setDescription(
      'Storage server information management module for Grupo Susess.',
    )
    .setVersion('1.0')
    //.addSecurity('bearer', {
    //type: 'http',
    //scheme: 'bearer',
    //})
    .addBearerAuth()
    .build();

  //const theme = new SwaggerTheme('v3');
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      ignoreGlobalPrefix: false,
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
    },
    //customCss: theme.getBuffer('dark'),
    customSiteTitle: 'API-SAI360',
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, customOptions);

  app.useStaticAssets(join(__dirname, '/static'), {
    prefix: '/docs',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.SERVER_PORT);

  logger.log(`Server running in ${await app.getUrl()}/docs`);
}
bootstrap();
