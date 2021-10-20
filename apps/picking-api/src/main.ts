import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app/app.module';
import { AccessTokenProvider } from './app/util';

const globalPrefix = 'graphql';
const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.setGlobalPrefix(globalPrefix);

  const accessTokenProvider = app.get(AccessTokenProvider);
  await accessTokenProvider.initAccessTokens();

  await app.listen(port, async () => {
    Logger.log(`Started Listening at ${await app.getUrl()}`, bootstrap.name);
  });
}

bootstrap();
