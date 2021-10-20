import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLRequestContext, GraphQLResponse } from 'apollo-server-types';
import { LoggerModule } from '../logger';
import configuration from './config/configuration.js';
import {
  ArticleService,
  CacheService,
  InventoryService,
  LegacyApiService,
  PickingService,
  PickingServiceMock,
} from './dataSources';
import * as Resolvers from './resolvers';
import { AccessTokenProvider } from './util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      isGlobal: true,
      appInsightOptions: {
        enabled: configuration().appInsightsEnabled,
        cloudRoleName: configuration().appInsightsCloudRoleName,
      },
    }),
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 1200,
      }),
    }),
    HttpModule,
    GraphQLModule.forRoot({
      formatResponse: (response: GraphQLResponse, requestContext: GraphQLRequestContext) => {
        if (requestContext.operationName === 'IntrospectionQuery') return response;
        // Add gql response to node http.Response to make available for app-insight/Dynatrace request loggers
        requestContext.context.req._gqlResponse = response;
        return response;
      },
      cors: true,
      // typePaths while development is relative to the code repo root and in released code is relative to the api dist folder
      // To make it works for release builds, we are using Copy Webpack Plugin (in ./webpack.config.js file)
      // to copy schemas specified in typePaths to same directories structure within api dist folder
      typePaths: ['libs/picking/data/api-contracts/src/schemas/**/*.graphql'],
      // auto generate typescript definitions only needed in development
      definitions:
        process.env.NODE_ENV === 'development'
          ? { path: 'libs/picking/data/api-contracts/src/typings/index.ts', emitTypenameField: true }
          : undefined,
    }),
    LoggerModule,
  ],
  providers: [
    AccessTokenProvider,
    PickingService,
    PickingServiceMock,
    InventoryService,
    ArticleService,
    ...Object.values(Resolvers),
    CacheService,
    LegacyApiService,
  ],
})
export class AppModule {}
