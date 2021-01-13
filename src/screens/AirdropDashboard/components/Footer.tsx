import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Button } from 'app/components';
import { MainCardStackNavigatorParams, Route, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.AirdropDashboard>
  >;
}

export const Footer: FC<Props> = ({ navigation }) => (
  <>
    <Button
      title={i18n.airdrop.dashboard.createNewWallet}
      onPress={() => {
        navigation.navigate(Route.CreateWallet);
      }}
      containerStyle={styles.buttonContainer}
    />
    <View style={styles.termsAndConditions}>
      <Text style={styles.description}>{i18n.airdrop.requirements.termsAndConditions.read}&nbsp;</Text>
      <TouchableOpacity
        onPress={() => {
          //TODO: navigate TC
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
