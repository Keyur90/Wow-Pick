/* eslint-disable @typescript-eslint/no-var-requires */

import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { EnvironmentPlugin, NormalModuleReplacementPlugin } from 'webpack';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';
import { dependencies } from '../../package.json';

delete process.env.TS_NODE_PROJECT;

// Explicitly tsconfig location till having this issue fixed https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32
const tsConfigFile = path.resolve(__dirname, './tsconfig.app.json');
const babelConfig = path.resolve(__dirname, './.babelrc');
const replacementEnvName = process.env.ENV_NAME && process.env.ENV_NAME !== 'undefined' ? process.env.ENV_NAME : null;
const getPublicPath = (relativePublicPath) => {
  if (process.env.PUBLIC_PATH) return process.env.PUBLIC_PATH;
  if (process.env.PUBLIC_PATH_BASE_URL) return new URL(relativePublicPath, process.env.PUBLIC_PATH_BASE_URL).href;
  return relativePublicPath;
};
const { environment: loadedEnvFile } = require(`./src/environments/environment${
  replacementEnvName ? `.${replacementEnvName}` : ''
}`);
// console.log(loadedEnvFile);

const config: webpack.Configuration = {
  // Setting mode to production add auto configure a lot of webpack settings that
  // Check this link for these settings https://webpack.js.org/configuration/mode/?_sm_au_=iVVF3RN7t2vQ5jrP8WWt8KQHNtGQ2#mode-production
  mode: 'production',

  entry: './src/main.tsx',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, '../../dist/apps/wowpick/shell'),
    filename: '[name].[contenthash].js',
    publicPath: getPublicPath('/wowpick/shell/'),
    clean: true, // Clean output directory before emit
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigFile,
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
        mainFields: ['module', 'main', 'es2015'],
      }),
    ],
  },

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript/Typescript files
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            //envName: configuration, // https://babeljs.io/docs/en/options#envname
            cacheDirectory: false, // No cache needed for production mode builds
            extends: babelConfig,
          },
        },
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }, // Read this for why this option needed https://kelly-kh-woo.medium.com/webpack-css-loader-importloaders-e8e23decd900
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: ['postcss-preset-env'] }, // PostCss preset env already includes autoprefixer preset
            },
          },
          'sass-loader',
        ],
      },

      // SVG Files, provide url for them and also convert them to ReactComponent
      {
        test: /\.svg$/,
        oneOf: [
          {
            // If coming from JS/TS file, then transform into React component using SVGR.
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack', { loader: 'url-loader', options: { limit: 8096 } }],
          },
          // Else (e.g. SVG is imported in CSS or SASS) then fallback to asset (same as url-loader with 8096 limit)
          { type: 'asset' },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files (data URIs)
      { test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
    ],
  },

  plugins: [
    // Extract css to css file(s)
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      templateParameters: { legacyRfAppBaseUrl: loadedEnvFile.legacyRfAppBaseUrl },
    }),

    // Adding eslint into the webpack process
    new ESLintPlugin({
      cache: false, // We don't need to cache for production mode
      files: 'src/**/*.{ts,tsx,js,jsx}',
      failOnWarning: true,
      formatter: 'codeframe',
    }),

    // Adding ts type check into the webpack process
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: { configFile: tsConfigFile },
    }),

    new CopyPlugin({
      patterns: [{ from: 'src/assets' }, { from: 'src/favicon.ico' }],
    }),

    new EnvironmentPlugin({ ENV_NAME: replacementEnvName }),

    // Replace any import statement that end with 'environments/environment' with projected with the absolute path to the
    // relative environment file
    replacementEnvName &&
      new NormalModuleReplacementPlugin(/(.*)\/environments\/environment/, (result) => {
        if (result.request.endsWith(`.${replacementEnvName}`)) {
          return;
        }
        result.request = result.request + `.${replacementEnvName}`;
      }),

    new ModuleFederationPlugin({
      name: 'shell',
      shared: [
        {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
        },
      ],
    }),
  ].filter(Boolean),

  // Control the webpack
  stats: {
    preset: 'default', //'detailed',
    modules: false,
    // loggingDebug: true, // Enable debugging to see the debug logs form webpack plugins
  },
};

export default config;
