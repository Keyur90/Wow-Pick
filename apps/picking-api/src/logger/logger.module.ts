import { DynamicModule, Module, Provider } from '@nestjs/common';
import { defaultClient } from 'applicationinsights';
import { utilities as nestWinstonModuleUtilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { appInsightsInitialize, AppInsightsOptions } from './appInsights';

export const APP_INSIGHTS_CLIENT = 'APP_INSIGHTS_CLIENT';

export interface LoggerModuleOptions {
  isGlobal?: boolean;
  winstonOptions?: WinstonModuleOptions;
  appInsightOptions?: AppInsightsOptions;
}

const defaultWinstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
    }),
  ],
};

@Module({})
export class LoggerModule {
  public static forRoot({
    isGlobal = false,
    winstonOptions = defaultWinstonOptions,
    appInsightOptions = { enabled: false },
  }: LoggerModuleOptions): DynamicModule {
    if (appInsightOptions.enabled) appInsightsInitialize(appInsightOptions);

    // Check this file to see how app insights map winston log levels to app insights severity levels
    // https://github.com/microsoft/ApplicationInsights-node.js/blob/develop/Tests/FunctionalTests/Runner/TaskExpectations.js

    const winstonModule = WinstonModule.forRoot(winstonOptions);
    const appInsightsClientProvider: Provider = { provide: 'APP_INSIGHTS_CLIENT', useValue: defaultClient || {} };
    return {
      global: isGlobal, // global modules need to be imported only at root module (AppModule), and will automatically be available for all child modules)
      module: LoggerModule,
      exports: [...winstonModule.exports, appInsightsClientProvider],
      providers: [...winstonModule.providers, appInsightsClientProvider],
    };
  }
}
