import { GraphQLResponse } from 'apollo-server-types';
import { Contracts, defaultClient, DistributedTracingModes, setup, start } from 'applicationinsights';

export interface AppInsightsOptions {
  enabled?: boolean;
  cloudRoleName?: string;
  samplingPercentage?: number;
  sendLiveMetrics?: boolean;
  autoCollectThirdPartyLoggerLogs?: boolean;
  autoCollectConsoleLog?: boolean;
  autoCollectExceptions?: boolean;
  autoCollectRequests?: boolean;
  autoDependencyCorrelation?: boolean;
  autoCollectDependencies?: boolean;
  autoCollectPerformance?: boolean;
  autoCollectPreAggregatedMetrics?: boolean;
  autoCollectHeartbeat?: boolean;
  distributedTracingMode?: DistributedTracingModes;
}

const defaultAppInsightsOptions: AppInsightsOptions = {
  cloudRoleName: '',
  samplingPercentage: 100, // 100%
  sendLiveMetrics: true,
  autoCollectThirdPartyLoggerLogs: true, // We are using winston as third party logger and appInsight can collet logs from winston
  autoCollectConsoleLog: false, // winston will log same data to both console and to app-insight, so we don't need app-insight to collect console log
  autoCollectExceptions: true,
  autoCollectRequests: true, // Should use Dynatrace instead
  autoDependencyCorrelation: true, // Should use Dynatrace instead
  autoCollectDependencies: true, // Should use Dynatrace instead
  autoCollectPerformance: false, // Should use Dynatrace instead
  autoCollectPreAggregatedMetrics: false, // Should use Dynatrace instead
  autoCollectHeartbeat: false, // Should use Dynatrace instead
  distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
};

const appInsightsInterceptor = (envelope: Contracts.EnvelopeTelemetry, context) => {
  const data = envelope.data.baseData;
  const request = context['http.ServerRequest'];
  const tags = envelope.tags;

  const isGraphQlRequest = envelope.data.baseType === 'RequestData' && request.body?.query;

  if (isGraphQlRequest) {
    const { operationName, query, variables } = request.body;

    if (operationName === 'IntrospectionQuery') return false;

    const queryOrMutation = (query as string)?.toLocaleLowerCase().startsWith('mutation') ? 'mutation' : 'query';
    const name = `${data.name}/${queryOrMutation}/${operationName || '<anonymous>'}`;
    tags['ai.operation.name'] = name;
    data.name = name;
    data.properties.query = query;
    data.properties.variables = variables;
    data.properties.operationName = operationName;

    const gqlResponse = request._gqlResponse as GraphQLResponse;
    const gqlResponseHasErrors = gqlResponse?.errors?.length > 0;
    if (gqlResponseHasErrors) {
      data.success = false;
      data.properties.errors = gqlResponse.errors;
      // data.properties.data = gqlResponse.data;
    }

    //TODO : add context userID and storeNo
    // data.properties.userId = 'testUser';
    // data.properties.storeNo = 'testStoreNo';
    // tags['userAuthUserId'] = 'testing';
  }

  delete tags['ai.device.id'];
  delete tags['ai.device.osVersion'];
  delete tags['ai.internal.sdkVersion'];
  delete tags['ai.device.osArchitecture'];
  delete tags['ai.device.osPlatform'];
  delete tags['ai.device.osVersion'];

  return true;
};

export const appInsightsInitialize = (appInsightsOptions: AppInsightsOptions = {}) => {
  const options = { ...defaultAppInsightsOptions, ...appInsightsOptions };

  setup(
    'InstrumentationKey=9a0a3b7d-c738-423d-812a-8a404a2a83cb;IngestionEndpoint=https://australiasoutheast-0.in.applicationinsights.azure.com/'
  ) // Connection string is passed down from env variable: APPLICATIONINSIGHTS_CONNECTION_STRING
    .setSendLiveMetrics(options.sendLiveMetrics)
    .setAutoCollectConsole(options.autoCollectThirdPartyLoggerLogs, options.autoCollectConsoleLog)
    .setAutoCollectExceptions(options.autoCollectExceptions)
    .setAutoCollectRequests(options.autoCollectRequests)
    .setAutoDependencyCorrelation(options.autoCollectDependencies)
    .setAutoCollectDependencies(options.autoCollectDependencies)
    .setAutoCollectPerformance(options.autoCollectPerformance)
    .setAutoCollectPreAggregatedMetrics(options.autoCollectPreAggregatedMetrics)
    .setAutoCollectHeartbeat(options.autoCollectHeartbeat)
    .setDistributedTracingMode(options.distributedTracingMode);

  if (options.cloudRoleName) defaultClient.context.tags[defaultClient.context.keys.cloudRole] = options.cloudRoleName;

  defaultClient.config.samplingPercentage = options.samplingPercentage;
  defaultClient.addTelemetryProcessor(appInsightsInterceptor);

  start();
};
