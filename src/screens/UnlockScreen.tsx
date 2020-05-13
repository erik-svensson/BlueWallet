import React, { PureComponent } from 'react';
import { StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { NavigationScreenProps } from 'react-navigation';

import { images } from 'app/assets';
import { Header, PinInput, Image } from 'app/components';
import { BiometricService } from 'app/services';

const i18n = require('../../loc');

interface Props {
  onSuccessfullyAuthenticated: () => void;
  isBiometricEnabledByUser: boolean;
}

export class UnlockScreen extends PureComponent<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} title={i18n.unlock.title} />,
  });
  state = {
    pin: '',
    showInput: true,
  };

  async componentDidMount() {
    if (this.props.isBiometricEnabledByUser) {
      await this.unlockWithBiometrics();
    }
  }

  unlockWithBiometrics = async () => {
    if (!!BiometricService.biometryType) {
      this.setState(
        {
          showInput: false,
        },
        async () => {
          const result = await BiometricService.unlockWithBiometrics();
          if (result) {
            this.props.onSuccessfullyAuthenticated();
          } else {
            this.setState({
              showInput: true,
            });
          }
        },
      );
    }
  };

  updatePin = (pin: string) => {
    this.setState({ pin }, async () => {
      if (this.state.pin.length === 4) {
        const setPin = await RNSecureKeyStore.get('pin');
        if (setPin === this.state.pin) {
          this.props.onSuccessfullyAuthenticated();
        } else {
          Alert.alert('wrong pin');
          this.setState({
            pin: '',
          });
        }
      }
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Image source={images.portraitLogo} style={styles.logo} resizeMode="contain" />
        {this.state.showInput && <PinInput value={this.state.pin} onTextChange={pin => this.updatePin(pin)} />}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 235,
  },
});
