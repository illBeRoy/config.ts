import { ConfigurationStructure, ConfigurationOutput, TConfigVariable } from './types';
import { readFileSync } from 'fs';
import { runMode } from './run-mode';

export const loadConfig = <TStructure extends ConfigurationStructure>(structure: TStructure): ConfigurationOutput<TStructure> => {
  if (runMode.get() === 'LOADER') {
    let config;
    try {
      config = JSON.parse(readFileSync('.config').toString());
    } catch (err) {
      throw new Error('Could not load configuration. Try running the configuration util');
    }

    validateConfig(config, structure);
    return config;
  } else {
    return structure as any;
  }
};

const validateConfig = (config, structure: ConfigurationStructure) => {
  Object.keys(structure)
    .forEach(key => {
      const expectedType = structure[key];
      const value = config[key];
      if (typeof value === 'undefined') {
        throw new Error(`Configuration key "${key}" is missing from configuration`);
      }
      if (!validateType(value, expectedType)) {
        throw new Error(`Configuration key "${key}" type is incorrect. Value expected to be: "${expectedType}"`);
      }
    });
};

const validateType = (value, type: TConfigVariable): boolean => {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
  }
};
