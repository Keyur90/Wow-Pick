import { HttpService } from '@nestjs/axios';
import { LoggerService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { throwError } from 'rxjs';
import { AccessTokenProvider } from '.';
import { AppModule } from '../app.module';

describe('Access Token Provider', () => {
  let httpService: HttpService;
  let accessTokenProvider: AccessTokenProvider;
  let logger: LoggerService;

  beforeEach(async () => {
    logger = { log: jest.fn(), warn: jest.fn(), error: jest.fn() };
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .setLogger(logger)
      .compile();

    accessTokenProvider = await moduleRef.resolve<AccessTokenProvider>(AccessTokenProvider);
    httpService = await moduleRef.resolve<HttpService>(HttpService);
  });

  it('Error to get access token should requeue the request', async () => {
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(httpService, 'request').mockImplementationOnce(() => throwError('Failed to get data'));
    await accessTokenProvider.initAccessTokens();

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(httpService.request).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
