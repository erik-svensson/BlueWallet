import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, ScreenTemplate, Button, InputItem } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams, ConfirmAddressFlowType } from 'app/consts';
import { isEmail } from 'app/helpers/helpers';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.AddEmail>
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.AddEmail>;
}

interface State {
  address: string;
  error: string;
}

export class AddEmailScreen extends Component<Props, State> {
  state = {
    address: '',
    error: '',
  };

  onConfirm = () => {
    if (!isEmail(this.state.address)) {
      return this.setState({
        error: i18n.notifications.invalidAddressError,
      });
    }
    this.props.navigation.navigate(Route.ConfirmEmail, {
      address: this.state.address,
      flowType: ConfirmAddressFlowType.FIRST_ADDRESS,
      walletToSubscribe: this.props.route.params.walletToSubscribe,
    });
  };

  onChange = (address: string) => this.setState({ address, error: '' });

  render() {
    const { address, error } = this.state;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={<Button title={i18n._.confirm} disabled={!address} onPress={this.onConfirm} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.addYourEmailFor}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.addYourEmailForDescription}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={address}
            setValue={this.onChange}
            autoFocus
            label={i18n.notifications.yourEmail}
            error={error}
          />
        </View>
      </ScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  infoDescription: {
    ...typography.caption,
    color: palette.textGrey,
    margin: 20,
    textAlign: 'center',
  },
  inputItemContainer: {
    paddingTop: 20,
    width: '100%',
    height: 100,
  },
});