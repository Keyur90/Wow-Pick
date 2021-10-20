/* eslint-disable @typescript-eslint/ban-ts-comment */
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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

const config: webpack.Configuration = {
  // Setting mode to development add auto configure a lot of webpack settings that
  // Check this link for these settings https://webpack.js.org/configuration/mode/?_sm_au_=iVV0nQtJ5s55jMnd8WWt8KQHNtGQ2#mode-development
  mode: 'development',

  entry: './src/main.tsx',
  target: 'browserslist',
  cache: { type: 'filesystem', name: 'legacy' },

  devtool: 'cheap-module-source-map',
  //@ts-ignore
  devServer: {
    // All options can be seen here https://github.com/webpack/webpack-dev-server/blob/master/lib/options.json
    historyApiFallback: true,
    port: 4002,
    firewall: false,
    // open: true,
    hot: false,
    compress: true, // Serve gzip content
    client: { overlay: true, logging: 'none' },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
          options: { extends: babelConfig },
        },
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2, debug: true }, // Read this for why this option needed https://kelly-kh-woo.medium.com/webpack-css-loader-importloaders-e8e23decd900
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
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    // Adding eslint into the webpack process
    new ESLintPlugin({
      /* 
        - Eslint takes at least 2 seconds to initialize, before the first time it runs regard less you enable eslint cache or not (eslint cache if exist 
          will be consulted after this initialization step), so to not to slow down the app start we set lintDirtyModulesOnly to true which will make 
          eslint do nothing at app start and only lint when developer edit a file and click save (hence it will be dirty), at this time eslint still 
          will take 2 seconds to initialize but at this is better than slow app start
        - Setting lintDirtyModulesOnly to true means only changed file will be linted and for changed files cache will never be consulted, hence we don't
          need eslint to wast time creating cache that will never be consulted
        - If eslint takes much more than 2 to 3 seconds then it is related to time the linting rules take to execute you can check time each rules take by
          setting env variable TIMING=1 and your terminal and then execute 'nrwl nx lint YOUR_PROJECT_NAME'
      */
      lintDirtyModulesOnly: true,
      cache: false,
      files: 'src/**/*.{ts,tsx,js,jsx}',
      failOnWarning: true,
      formatter: 'codeframe', // HighlightCode (use colours) is hardcoded to false >>  node_modules\eslint\lib\cli-engine\formatters\codeframe.js
    }),

    // Adding ts type check into the webpack process
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: { configFile: tsConfigFile },
    }),

    // Copies files from target to destination folder
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
      name: 'legacy',
      filename: 'legacy-remoteEntry.js',
      exposes: {
        './App': './src/legacy-bootstrap',
      },
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

  // Control the webpack stats
  stats: {
    preset: 'default', //'detailed', 'verbose'
    modules: false,
    // loggingDebug: true, // Enable debugging to see the debug logs form webpack plugins
  },
};

export default config;
