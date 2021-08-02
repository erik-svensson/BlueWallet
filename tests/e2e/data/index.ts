import { getBuildEnv } from '../helpers/utils';
import { DataTestEnv } from '../types';
import * as dev from './env/dev';
import * as prod from './env/prod';
import * as stage from './env/stage';
import getMainnetData from './net/mainnet';
import getTestnetData from './net/testnet';

const buildEnv = getBuildEnv();

const envs: Record<string, DataTestEnv> = {
  dev,
  stage,
  prod,
};

export const envData = envs[buildEnv];
export const walletsData = buildEnv === 'dev' ? getTestnetData() : getMainnetData();
export * from './commons';
