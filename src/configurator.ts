#!/usr/bin/env node
import * as path from 'path';
import { writeFileSync } from 'fs';
import { ConfigurationStructure } from './types';
import { prompt, start, title, clear, success, terminate } from './cli';
import { runMode } from './run-mode';

export const runConfigurationUtil = async () => {
  require('ts-node/register');

  const packageJson = require(path.join(process.cwd(), 'package.json'));
  const inputFile = path.join(process.cwd(), 'config.ts');
  const outputFile = path.join(process.cwd(), '.config');

  const structure: ConfigurationStructure = require(inputFile).default;

  clear();
  title('Welcome to config.ts configuration utility!');
  start(`Please fill configuration values, so they can be used in runtime by ${packageJson.name}`);
  const configuration = {};
  for (const key of Object.keys(structure)) {
    const valueType = structure[key];
    switch (valueType) {
      case 'string':
        configuration[key] = await prompt(`Value for ${key} (string)`, 'text');
        break;
      case 'number':
        configuration[key] = await prompt(`Value for ${key} (number)`, 'number');
        break;
      case 'boolean':
        configuration[key] = await prompt(`Value for ${key} (boolean)`, 'select', [true, false]);
        break;
    }
  }

  writeFileSync(outputFile, JSON.stringify(configuration, null, 2));
  success('Configuration created successfully!');
};

if (require.main === module) {
  runMode.set('CONFIGURATOR');
  runConfigurationUtil()
    .catch(err => terminate(`An error occurred: ${err.message}`));
}
