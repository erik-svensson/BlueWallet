// @ts-ignore
import { getArgValue } from 'detox/src/utils/argparse';

/**
 * Checks if current configuration includes "beta" word.
 */
export const isBeta = (): boolean => {
  const argparse = require('detox/src/utils/argparse');

  return argparse.getArgValue('configuration').includes('beta');
};

/** Generates random string */
export const randomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

/** Waits x miliseconds */
export const wait = (miliseconds: number) =>
  new Promise(resolve => {
    setTimeout(resolve, miliseconds);
  });

export function getBuildEnv() {
  const configurationName = process.env.DETOX_CONFIGURATION;

  const env = configurationName?.match(/dev|stage|prod/);

  if (!env) {
    throw new Error(
      'Could not obtain current Detox configuration. DETOX_CONFIGURATION env variable not set or does not contain expected environment part: dev, stage or prod.',
    );
  } else {
    return env.toString();
  }
}

export function isEmulator() {
  const configurationName = process.env.DETOX_CONFIGURATION;

  const isEmu = configurationName?.match(/\.emu\.|\.sim\./);

  return isEmu;
}
