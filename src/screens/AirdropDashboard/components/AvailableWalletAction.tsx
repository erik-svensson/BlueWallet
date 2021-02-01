import React, { FC } from 'react';

import { ProgressButton } from 'app/components';

const i18n = require('../../../../loc');

interface Props {
  onActionClick: () => void;
}

export const AvailableWalletAction: FC<Props> = ({ onActionClick }) => {
  return (
    <ProgressButton
      timeoutMilis={5000}
      stepIntervalMilis={100}
      onComplete={onActionClick}
      title={i18n._.add}
      inProgressTitle={i18n._.undo}
      height={18}
      width={53}
      borderRadius={9}
    />
  );
};
