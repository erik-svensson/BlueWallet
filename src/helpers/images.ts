import { images } from 'app/assets';

import config from '../../config';

export const logoSource = config.isBeta ? images.portraitBetaLogo : images.goldWalletLogoBlack;
