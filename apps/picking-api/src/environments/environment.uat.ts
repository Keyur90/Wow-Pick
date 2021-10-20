import { base } from './environment.base';

export const environment = {
  ...base,
  envName: 'development',
  normalPickingServiceUrl: 'https://URL_TO_BE_ADDED/picking-service/api/',
  articleApiBaseUrl: 'https://ofk8saae.uat.wx-d.net/article-service/articles',
  articleServiceApiKey: 'C510A5B3-A268-4E7B-A4B3-4E742DB04E2B', // Should be moved to pipeline secrets
  inventoryApiBaseUrl: 'https://ofk8saae.uat.wx-d.net/inventory/',
  inventoryApiAuthUrl: 'https://platk8saae.uat.wx-d.net/rhel-sso/realms/ecf/protocol/openid-connect/token',
  inventoryApiClientSecret: '0a6e0c8e-0fb2-4c61-83f1-6bca07b718f3', // Should be moved to pipeline secrets
  legacyApiBaseUrl: 'https://URL_TO_BE_ADDED/api',
};
