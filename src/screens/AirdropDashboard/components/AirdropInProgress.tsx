import React, { FC, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { Countdown } from 'app/components';
import { Wallet } from 'app/consts';
import { isAfter } from 'app/helpers/date';
import { selectors } from 'app/state/airdrop';
import { SubscribeWalletActionCreator } from 'app/state/airdrop/actions';
import { typography, palette } from 'app/styles';

import { AirdropInProgressContent } from './';

const i18n = require('../../../../loc');

interface Props {
  availableWallets: Wallet[];
  subscribedWallets: Wallet[];
  subscribeWallet: SubscribeWalletActionCreator;
  error: boolean;
  loading: boolean;
  usersQuantity: number;
}

export const AirdropInProgress: FC<Props> = props => {
  const airdropEndDate = useSelector(selectors.airdropEndDate);
  const airdropIncubationDate = useSelector(selectors.airdropIncubationDate);
  const airdropCampaignDate = useSelector(selectors.airdropCampaignDate);

  const checkPhaseDate = useCallback(() => {
    if (isAfter(new Date(), airdropIncubationDate) && isAfter(new Date(), airdropCampaignDate)) {
      return airdropEndDate;
    } else if (isAfter(new Date(), airdropIncubationDate)) {
      return airdropCampaignDate;
    } else {
      return airdropIncubationDate;
    }
  }, [airdropIncubationDate, airdropCampaignDate, airdropEndDate]);

  const checkPhaseText = () => {
    if (isAfter(new Date(), airdropIncubationDate) && isAfter(new Date(), airdropCampaignDate)) {
      return 'end';
    } else if (isAfter(new Date(), airdropIncubationDate)) {
      return 'campaign';
    } else {
      return 'incubation';
    }
  };

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>
          {checkPhaseText() === 'incubation'
            ? i18n.airdrop.phase.incubation.title
            : checkPhaseText() === 'campaign'
            ? i18n.airdrop.phase.campaign.title
            : i18n.airdrop.phase.end.title}
        </Text>
        <Text style={styles.description}>
          {checkPhaseText() === 'incubation'
            ? i18n.airdrop.phase.incubation.desc
            : checkPhaseText() === 'campaign'
            ? i18n.airdrop.phase.campaign.desc
            : i18n.airdrop.phase.end.desc}
        </Text>
      </View>
      <Countdown dataEnd={checkPhaseDate()} />
      <AirdropInProgressContent {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
});
