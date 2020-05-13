import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import { NavigationScreenProps } from 'react-navigation';

import { Header, PinInput } from 'app/components';
import { Route } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

export class ConfirmPinScreen extends PureComponent {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.onboarding.pin} />,
  });

  state = {
    pin: '',
    error: '',
  };

  updatePin = pin => {
    this.setState({ pin }, async () => {
      if (this.state.pin.length === 4) {
        setPin = this.props.navigation.getParam('pin');
        if (setPin === this.state.pin) {
          await RNSecureKeyStore.set('pin', this.state.pin, {
            accessible: ACCESSIBLE.WHEN_UNLOCKED,
          });
          CreateMessage({
            title: i18n.contactCreate.successTitle,
            description: i18n.onboarding.successDescription,
            type: MessageType.success,
            buttonProps: {
              title: i18n.onboarding.successButton,
              onPress: () => this.props.navigation.navigate(Route.Dashboard),
            },
          });
        } else {
          this.setState({
            error: i18n.onboarding.pinDoesNotMatch,
            pin: '',
          });
        }
      }
    });
  };

  render() {
    const { error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={typography.headline4}>{i18n.onboarding.confirmPin}</Text>
        <View style={styles.input}>
          <PinInput value={this.state.pin} onTextChange={pin => this.updatePin(pin)} />

          <Text style={styles.errorText}>{error}</Text>
        </View>
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
  input: {
    alignItems: 'center',
  },
  errorText: {
    marginVertical: 30,
    color: palette.textRed,
    ...typography.headline6,
  },
});
