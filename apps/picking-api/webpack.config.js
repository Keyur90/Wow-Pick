/* eslint-disable @typescript-eslint/no-unused-vars */

// The below function is called by nrwl nx node build executor to allow us override webpack config
// @link: https://github.com/nrwl/nx/blob/4d6b5ff7af3036ebb680be3f028cb248e1fc26bc/packages/node/src/executors/build/build.impl.ts#L80
/**
 * @param {import('webpack').Configuration} webpackConfig Webpack Configuration
 * @param {{options: import('@nrwl/node/src/utils/types').NormalizedBuildNodeBuilderOptions, configuration: string}} nrwlNodeExecutorContext Nrwl Node Build Executor Context
 */
module.exports = (webpackConfig, nrwlNodeExecutorContext) => {
  // if this is a build and not development run
  if (webpackConfig.mode === 'production') {
    const copyPlugin = webpackConfig.plugins && webpackConfig.plugins.find((_) => _.constructor?.name === 'CopyPlugin');
    if (copyPlugin) {
      copyPlugin.patterns.push(
        // from is relative to process.cwd() which is the code repo root
        // to is relative to api dist folder (where inside the api dist folder you need to copy)
        { from: 'libs/picking/data/api-contracts/src/schemas', to: 'libs/picking/data/api-contracts/src/schemas' },
        { from: 'yarn.lock', to: 'yarn.lock' }
      );
    }
  }

  return webpackConfig;
};

// Check the below link for more info about intellisense for non typescript function params
// https://www.blinkingcaret.com/2020/10/07/javascript-intellisense/
