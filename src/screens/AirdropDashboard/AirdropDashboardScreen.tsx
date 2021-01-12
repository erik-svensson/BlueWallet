import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Button, Image, Countdown } from 'app/components';
import { CONST, MainCardStackNavigatorParams, Route, RootStackParams } from 'app/consts';
import { getFormattedAirdropDate } from 'app/helpers/airdrop';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.AirdropDashboard>
  >;
}

export const AirdropDashboardScreen: FC<Props> = ({ navigation }) => (
  <ScreenTemplate
    footer={
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
    }
    header={<Header isBackArrow title={i18n.airdrop.title} />}
  >
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <Text style={typography.headline4}>{i18n.airdrop.title}</Text>
        <Text style={[styles.description, styles.spaceTop]}>{i18n.airdrop.dashboard.desc1}</Text>
        <Text style={styles.description}>
          {i18n.airdrop.dateOfAirdrop}
          {getFormattedAirdropDate()}
        </Text>
      </View>
      <Countdown dataEnd={CONST.airdropDate} />

      <Image source={images.airdrop} style={styles.airdropImage} />
      <Text style={styles.description}>{i18n.airdrop.dashboard.desc2}</Text>
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
  airdropImage: {
    width: 189,
    height: 193,
    marginTop: 27.5,
    marginBottom: 20,
  },
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
  spaceTop: {
    marginTop: 18,
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
