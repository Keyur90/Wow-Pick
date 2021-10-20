const envName = process.env.envName;
const config = envName
  ? require(`../../environments/environment.${envName}`)
  : require(`../../environments/environment`);

const getValue = (key) => process.env[key] || config.environment[key];

// console.log(`env is ${envName}`);
// console.log(getValue('normalPickingServiceUrl'));

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  appInsightsEnabled: getValue('appInsightsEnabled') === 'true',
  appInsightsCloudRoleName: getValue('appInsightsCloudRoleName'),
  cacheDefaultTimeout: getValue('cacheDefaultTimeout'),
  actualWeightTradingDepartments: getValue('actualWeightTradingDepartments'),
  articleServiceConfig: {
    baseurl: getValue('articleApiBaseUrl'),
    apiKey: getValue('articleServiceApiKey'),
  },
  pickingServiceConfig: {
    baseUrl: getValue('normalPickingServiceUrl'),
    apiKey: getValue('normalPickingServiceApiKey'),
  },
  inventoryServiceConfig: {
    baseUrl: getValue('inventoryApiBaseUrl'),
    authUrl: getValue('inventoryApiAuthUrl'),
    clientSecret: getValue('inventoryApiClientSecret'),
  },
  legacyApiServiceConfig: {
    baseurl: getValue('legacyApiBaseUrl'),
  },
  enableMockedPickingApi: getValue('enableMockedPickingApi'),
  mockedNormalApiTrips: getValue('mockedNormalApiTrips'),
});
