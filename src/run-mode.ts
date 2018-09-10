export type RunMode = 'LOADER' | 'CONFIGURATOR';

export class RunModeConfiguration {
  get(): RunMode {
    return process.env.__CONFIG_TS_RUN_MODE || 'LOADER' as any;
  }

  set(runMode: RunMode) {
    process.env.__CONFIG_TS_RUN_MODE = runMode;
  }
}

export const runMode = new RunModeConfiguration();
