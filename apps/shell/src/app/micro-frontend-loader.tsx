/* eslint-disable @typescript-eslint/ban-ts-comment */
import load from 'little-loader';
import { MicroFrontendConfig } from '../micro-frontends-config';

const loadScript = (url) =>
  new Promise((resolve, reject) => {
    load(url, {
      callback: (err) => {
        if (err) return reject(err);
        resolve(true);
      },
    });
  });

const loadFederatedModule = async (scope, url, module) => {
  await loadScript(url); // Load the remote entry, once loaded it will be registered in webpack

  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // @ts-ignore
  await __webpack_init_sharing__('default');

  const container = window[scope]; // or get the container somewhere else

  // Initialize the container, it may provide shared modules
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);

  // @ts-ignore
  const factory = await window[scope].get(module);

  const loadedModule = factory();
  return loadedModule;
};

const cache = {};
const getCacheKey = (url, scope, module) => `${url}-${scope}-${module}`;

export const getFederatedModule = ({ name, url, module }: MicroFrontendConfig) => {
  const cacheKey = getCacheKey(name, url, module);

  if (!cache[cacheKey]) cache[cacheKey] = loadFederatedModule(name, url, module);

  return cache[cacheKey];
};

export const getMicroFrontend = (config: MicroFrontendConfig) => {
  config.type = config.type || 'federatedApp';
  config.module = config.module || './App';

  if (config.type === 'federatedApp') return getFederatedModule(config);

  console.error(`We still did not support loading ${config.type} type.`);
};
