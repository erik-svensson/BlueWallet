import Config from 'react-native-config';

import { images } from 'app/assets';

export const getLogoSource = () =>
  Config.IS_BETA === '1' ? images.goldWalletLogoBlackBeta : images.goldWalletLogoBlack;
