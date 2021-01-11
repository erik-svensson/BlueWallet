import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Button, Image, Countdown } from 'app/components';
import { CONST, MainCardStackNavigatorParams, Route, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

import { HDSegwitP2SHArWallet, HDSegwitP2SHAirWallet } from '../../../class';
import config from '../../../config';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.RecoverySend>
  >;

  route: RouteProp<MainCardStackNavigatorParams, Route.RecoverySend>;
}

export const AirdropDashboard = ({ navigation }: Props) => (
  <ScreenTemplate
    footer={
      <Button
        title={i18n.airdrop.createNewWallet}
        onPress={() => {
          navigation.navigate(Route.CreateWallet);
        }}
        containerStyle={styles.buttonContainer}
      />
    }
    header={<Header isBackArrow title={i18n.airdrop.title} />}
  >
    <View style={styles.infoContainer}>
      <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
      <Text style={styles.description}>{i18n.airdrop.dashboard.desc1}</Text>
    </View>
    <Image source={images.airdrop} />
  </ScreenTemplate>
);

export default AirdropDashboard;

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
