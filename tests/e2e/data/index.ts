import { getBuildType } from '../helpers/utils';
import { DataTestWallets } from '../types';
import getMainnetData from './mainnet';
import getTestnetData from './testnet';

export default getBuildType() === 'dev' ? getTestnetData() : getMainnetData();
export * from './commons';
