import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { isAfterAirdrop } from 'app/helpers/airdrop';

import { AirdropFinished, AirdropInProgress } from './components';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

// TODO: when implementing data fetching, add loading and error screens here.
// loading: https://app.zeplin.io/project/5f0c8686b8151e82242dd409/screen/6005bdd8de723b5789229476
// error: https://app.zeplin.io/project/5f0c8686b8151e82242dd409/screen/6005a32229c91b1a89551702

export const AirdropDashboardScreen: FC<Props> = ({ navigation }) => (
  <ScreenTemplate header={<Header isBackArrow title={i18n.airdrop.title} />}>
    <View style={styles.wrapper}>
      {isAfterAirdrop() ? <AirdropFinished navigation={navigation} /> : <AirdropInProgress navigation={navigation} />}
    </View>
  </ScreenTemplate>
);

export default AirdropDashboardScreen;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
