import cucumber from 'cypress-cucumber-preprocessor';
import { sync as resolveSync } from 'resolve';

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  const options = { typescript: resolveSync('typescript', { basedir: config.projectRoot }) };

  on('file:preprocessor', cucumber(options));
};
