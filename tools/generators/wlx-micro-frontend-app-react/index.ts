import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  toJS,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { applicationGenerator } from '@nrwl/react';
import { normalizeOptions } from '@nrwl/react/src/generators/application/lib/normalize-options';
// import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { NormalizedSchema, Schema } from './schema';

export default async function (host: Tree, schema: Schema) {
  schema.classComponent = false; // We need to use functional components.
  schema.linter = Linter.EsLint;
  schema.skipFormat = false;
  schema.routing = false;

  await applicationGenerator(host, schema);

  // console.log(schema);
  // @ts-ignore
  const options: NormalizedSchema = normalizeOptions(host, schema);
  options.port = schema.port;

  // console.log(options);

  generateFiles(
    host,
    joinPathFragments(__dirname, './files'), // Where is template files exist
    options.appProjectRoot, // Where to put the output
    // Template variables
    {
      ...names(options.name),
      ...options,
      offsetFromRoot: offsetFromRoot(options.appProjectRoot),

      webpackEntryPoint: options.js ? './src/main.jsx' : './src/main.tsx',
      // dashes are not allowed in module federation `name` property
      moduleFederationRemoteName: `${options.projectName.replace(new RegExp('-', 'g'), '_')}`,
      moduleFederationExposedModuleName: `./App`,
      tmpl: '', // This substitution option to replace  __tmpl__ in file names with empty string ''
    }
  );

  if (options.js) {
    toJS(host);
  }

  // Below code inspired form this https://github.com/nrwl/nx/blob/master/packages/react/src/generators/application/lib/add-project.ts
  updateProjectTargets(host, options);
  if (options.e2eTestRunner === 'cypress') updateCypressProjectTargets(host, options); //Also update cypress project if any

  // Format all files created or updated using prettier
  await formatFiles(host);
}

function updateProjectTargets(host: Tree, options: NormalizedSchema) {
  const project = readProjectConfiguration(host, options.projectName);

  project.targets.serve = {
    executor: '@nrwl/workspace:run-commands',
    options: {
      cwd: options.appProjectRoot,
      command:
        'cross-env ENV_NAME={args.env-name} TS_NODE_PROJECT="webpack.tsconfig.json" NODE_ENV=development webpack serve --config webpack.dev.config.ts',
    },
    configurations: {
      prod: {
        args: '--env-name=prod',
      },
    },
  };

  project.targets.build = {
    executor: '@nrwl/workspace:run-commands',
    outputs: ['{options.outputPath}'],
    options: {
      cwd: options.appProjectRoot,
      command:
        'cross-env ENV_NAME={args.env-name} TS_NODE_PROJECT="webpack.tsconfig.json" NODE_ENV=production webpack --config webpack.prod.config.ts',
      outputPath: joinPathFragments('dist', options.appProjectRoot),
    },
    configurations: {
      prod: {
        args: '--env-name=prod',
      },
    },
  };

  updateProjectConfiguration(host, options.projectName, project);
}

function updateCypressProjectTargets(host: Tree, options: NormalizedSchema) {
  const e2eProject = readProjectConfiguration(host, options.e2eProjectName);

  const e2eProjectRoot = `${options.appProjectRoot}-e2e`;

  e2eProject.targets['cypress-run'] = {
    executor: '@nrwl/cypress:cypress',
    options: {
      cypressConfig: joinPathFragments(e2eProjectRoot, 'cypress.json'),
      tsConfig: joinPathFragments(e2eProjectRoot, 'tsconfig.e2e.json'),
      baseUrl: `http://localhost:${options.port}`,
      headless: true,
    },
    configurations: { production: { devServerTarget: `${options.projectName}:serve:production` } },
  };

  e2eProject.targets['cypress-open'] = {
    executor: '@nrwl/cypress:cypress',
    options: {
      cypressConfig: joinPathFragments(e2eProjectRoot, 'cypress.json'),
      tsConfig: joinPathFragments(e2eProjectRoot, 'tsconfig.e2e.json'),
      baseUrl: `http://localhost:${options.port}`,
      watch: true,
    },
    configurations: { production: { devServerTarget: `${options.projectName}:serve:production` } },
  };

  e2eProject.targets.e2e = {
    executor: '@nrwl/workspace:run-commands',
    outputs: [],
    options: {
      command: `start-server-and-test "nx serve ${options.projectName}" http://localhost:${options.port} "nx run ${options.e2eProjectName}:cypress-run"`,
    },
  };

  e2eProject.targets['e2e-open'] = {
    executor: '@nrwl/workspace:run-commands',
    outputs: [],
    options: {
      command: `start-server-and-test "nx serve ${options.projectName}" http://localhost:${options.port} "nx run ${options.e2eProjectName}:cypress-open"`,
    },
  };

  updateProjectConfiguration(host, options.e2eProjectName, e2eProject);
}
