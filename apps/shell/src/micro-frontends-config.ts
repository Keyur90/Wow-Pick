import { environment } from './environments/environment';

export type MicroFrontendTypes = 'federatedApp' | 'webComponent' | 'iframe';
export interface MicroFrontendConfig {
  name: string;
  url: string | string[];
  type?: MicroFrontendTypes;
  module?: string;
}

const microFrontendsConfig: MicroFrontendConfig[] = [
  { name: 'picking', url: environment.pickingMicroFrontendUrl },
  { name: 'legacy', url: environment.legacyMicroFrontendUrl },
];

export { microFrontendsConfig };
