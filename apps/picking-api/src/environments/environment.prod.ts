import { base } from './environment.base';

export const environment = {
  ...base,
  production: true,
  normalPickingServiceUrl: 'https://URL_TO_BE_ADDED/picking-service/api/',
  articleApiBaseUrl: 'https://URL_TO_BE_ADDED/article-service/articles',
  articleServiceApiKey: 'C510A5B3-A268-4E7B-A4B3-4E742DB04E2B', // Should be moved to pipeline secrets
  inventoryApiBaseUrl: 'https://URL_TO_BE_ADDED/inventory/',
  inventoryApiAuthUrl: 'https://TO_BE_ADDED/rhel-sso/realms/ecf/protocol/openid-connect/token',
  inventoryApiClientSecret: '0a6e0c8e-0fb2-4c61-83f1-6bca07b718f3', // Should be moved to pipeline secrets
  legacyApiBaseUrl: 'https://wowfbwr.gss.woolworths.com.au/api',
};
