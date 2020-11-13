import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, View, TouchableOpacity, StatusBar, StyleSheet, Dimensions } from 'react-native';

import { icons } from 'app/assets';
import { Button, InputItem, ScreenTemplate } from 'app/components';
import { MainCardStackNavigatorParams, Route } from 'app/consts';

const { width } = Dimensions.get('window');
const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.ScanQrCode>;
  route: RouteProp<MainCardStackNavigatorParams, Route.ScanQrCode>;
}

export default class ScanQrCodeScreen extends React.PureComponent<Props> {
  state = {
    customString: '',
  };

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

  setCustomString = (value: string): void => this.setState({ customString: value });

  onSubmitCustomStringButtonClicked = () => {
    this.onBarCodeScanned(this.state.customString);
    this.goBack();
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
      <ScreenTemplate contentContainer={styles.container}>
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

        <View>
          <InputItem
            focused={!!this.state.customString}
            multiline
            setValue={this.setCustomString}
            label={i18n.contactCreate.addressLabel}
          />
          <TouchableOpacity style={styles.submitCustomStringButton} onPress={this.onSubmitCustomStringButtonClicked}>
            <Image style={styles.submitCustomStringImage} source={icons.arrowRight} />
          </TouchableOpacity>
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  submitCustomStringButton: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    padding: 8,
  },
  submitCustomStringImage: {
    width: 24,
    height: 24,
    padding: 8,
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
});
