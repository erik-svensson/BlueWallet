import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Button } from 'app/components';
import { RootStackParams, Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

interface Props {
  route: RouteProp<RootStackParams, Route.AirdropDashboard>;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainTabStackNavigator>,
    StackNavigationProp<RootStackParams, Route.AirdropDashboard>
  >;
}

export const Footer: FC<Props> = ({ navigation, route }) => (
  <>
    <Button
      title={i18n.airdrop.dashboard.createNewWallet}
      onPress={() => {
        navigation.navigate(Route.CreateWallet, { parentRouteName: route.name });
      }}
      containerStyle={styles.buttonContainer}
    />
    <View style={styles.termsAndConditions}>
      <Text style={styles.description}>{i18n.airdrop.requirements.termsAndConditions.read}&nbsp;</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Route.AirdropTermsAndConditions);
        }}
      >
        <Text style={styles.termsText}>{i18n.airdrop.requirements.termsAndConditions.termsAndConditions}</Text>
      </TouchableOpacity>
    </View>
  </>
);

const styles = StyleSheet.create({
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  termsAndConditions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  termsText: {
    ...typography.headline5,
    color: palette.secondary,
    marginLeft: 1,
    lineHeight: 19,
  },
});
