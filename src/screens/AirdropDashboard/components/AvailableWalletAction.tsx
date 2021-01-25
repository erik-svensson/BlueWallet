import React, { FC } from 'react';

import { ProgressButton } from 'app/components';
import { AirdropWalletDetails } from 'app/consts';

const i18n = require('../../../../loc');

interface Props {
  wallet: AirdropWalletDetails;
}

export const AvailableWalletAction: FC<Props> = ({ wallet }) => {
  const addWallet = (wallet: AirdropWalletDetails) => {
    // TODO: API call
    console.log('wallet');
    console.log(wallet);
  };

  return (
    <ProgressButton
      timeoutMilis={5000}
      stepIntervalMilis={100}
      onComplete={() => addWallet(wallet)}
      title={i18n._.add}
      inProgressTitle={i18n._.undo}
      height={18}
      width={53}
      borderRadius={9}
    />
  );
};
