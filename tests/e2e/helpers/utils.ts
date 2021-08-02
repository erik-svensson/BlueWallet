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

// HACK: unofficial, undocumented way to obtain the name of current detox configuration
export function getBuildEnv() {
  const configurationName = getArgValue('configuration');
  const flavour = configurationName.match(/dev|stage|prod/);

  return flavour.toString();
}
