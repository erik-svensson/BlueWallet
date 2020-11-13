import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, View, TouchableOpacity, StatusBar, StyleSheet, Dimensions } from 'react-native';

import { images } from 'app/assets';
import { Button } from 'app/components';
import { MainCardStackNavigatorParams, Route } from 'app/consts';
import { getStatusBarHeight } from 'app/styles';

const { width } = Dimensions.get('window');
const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.ScanQrCode>;
  route: RouteProp<MainCardStackNavigatorParams, Route.ScanQrCode>;
}

export default class ScanQrCodeScreen extends React.PureComponent<Props> {
  goBack = () => this.props.navigation.goBack();

  onButtonClicked = (data: string) => {
    this.onBarCodeScanned(data);
    this.goBack();
  };

  onBarCodeScanned = (data: string) => {
    const { onBarCodeScan } = this.props.route.params;

    if (data) {
      onBarCodeScan(data);
    }
  };

  mockedQrCodeData = {
    publicKey1:
      '0442d7724d90fb60bc969f8b0fd46f3f63fe17637d5a0ba2fa9800b3b85946b72c3b81199572cd91bad23c87c3e96dbaa68e1c4b3e47d09276bd63138c584a5a7b',
    publicKey2:
      '04e8bc5e2428dcebe434306adaa944cb5eb7df80ec2e544f94ab2cea9bc5a70b5b1af42a83a936cd9d277413a8c5303001beaa268724270e4f2ce4d62010421960',
    privateKey: 'a5fc88ad7dcb502d9598f2907f76233aa98c0f53b58d7729ae0c8e0c48fb86d7',
    seedPhrase: 'puppy cook east baby pond gasp blouse achieve cloud impose broken lunar',
    dummy: 'foo bar baz',
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <>
          <StatusBar hidden />
          <Button
            onPress={() => {
              this.onButtonClicked(this.mockedQrCodeData.publicKey1);
            }}
            title={'Public Key 1'}
            containerStyle={styles.button}
          />
          <Button
            onPress={() => {
              this.onButtonClicked(this.mockedQrCodeData.publicKey1);
            }}
            title={'Public Key 2'}
            containerStyle={styles.button}
          />
          <Button
            onPress={() => {
              this.onButtonClicked(this.mockedQrCodeData.privateKey);
            }}
            title={'Private Key'}
            containerStyle={styles.button}
          />
          <Button
            onPress={() => {
              this.onButtonClicked(this.mockedQrCodeData.seedPhrase);
            }}
            title={'Seed phrase'}
            containerStyle={styles.button}
          />
          <Button
            onPress={() => {
              this.onButtonClicked(this.mockedQrCodeData.dummy);
            }}
            title={'Dummy QR code'}
            containerStyle={styles.button}
          />
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
});
