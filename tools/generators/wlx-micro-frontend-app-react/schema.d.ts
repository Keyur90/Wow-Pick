import { Linter } from '@nrwl/linter';
import { SupportedStyles } from '@nrwl/react';

export interface Schema {
  name: string;
  port: number;
  style: SupportedStyles;
  skipFormat: boolean;
  directory?: string;
  tags?: string;
  unitTestRunner: 'jest' | 'none';
  babelJest: boolean;
  e2eTestRunner: 'cypress' | 'none';
  linter: Linter;
  pascalCaseFiles?: boolean;
  classComponent?: boolean;
  routing?: boolean;
  skipWorkspaceJson?: boolean;
  js?: boolean;
  globalCss?: boolean;
}

export interface NormalizedSchema extends Schema {
  projectName: string;
  appProjectRoot: string;
  e2eProjectName: string;
  parsedTags: string[];
  fileName: string;
  styledModule: null | SupportedStyles;
  hasStyles: boolean;
}
