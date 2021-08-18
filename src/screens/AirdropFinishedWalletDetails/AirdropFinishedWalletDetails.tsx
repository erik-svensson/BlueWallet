import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ScreenTemplate, Header, AirdropBalanceCard, AirdropStayTuned } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { getCarouselItem } from 'app/helpers/airdrop';
import { selectors } from 'app/state/airdrop';
import { typography } from 'app/styles';

const i18n = require('../../../loc');

type Props = {
  route: RouteProp<RootStackParams, Route.AirdropFinishedWalletDetails>;
};

export const AirdropFinishedWalletDetails: FC<Props> = ({ route }: Props) => {
  const isAfterAirdrop = useSelector(selectors.isAfterAirdrop);
  const airdropGoals = useSelector(selectors.badges);
  const airdropsWalletBalance = useSelector(selectors.airdropsWalletBalance);

  return (
    <ScreenTemplate header={<Header isBackArrow title={i18n.airdrop.title} />}>
      <Text style={styles.subtitle}>{i18n.airdrop.finished.subtitle}</Text>
      <View style={styles.walletCard}>
        <AirdropBalanceCard
          data={getCarouselItem(
            {
              balance: route.params.balance,
              label: route.params.header,
            },
            isAfterAirdrop,
            airdropGoals,
            airdropsWalletBalance,
          )}
        />
      </View>
      <View style={styles.stayTunedContainer}>
        <AirdropStayTuned />
      </View>
    </ScreenTemplate>
  );
};

export default AirdropFinishedWalletDetails;

const styles = StyleSheet.create({
  walletCard: { alignItems: 'center' },
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  stayTunedContainer: {
    marginTop: 36,
  },
});
