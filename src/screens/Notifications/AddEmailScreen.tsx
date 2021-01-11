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
  email: string;
  error: string;
}

export class AddEmailScreen extends Component<Props, State> {
  state = {
    email: '',
    error: '',
  };

  onConfirm = () => {
    const {
      navigation,
      route: {
        params: { walletsToSubscribe },
      },
    } = this.props;
    const { email } = this.state;

    if (!isEmail(email)) {
      return this.setState({
        error: i18n.notifications.invalidAddressError,
      });
    }

    if (walletsToSubscribe) {
      return navigation.navigate(Route.ConfirmEmail, {
        email,
        flowType: ConfirmAddressFlowType.FIRST_ADDRESS,
        walletsToSubscribe,
      });
    }

    navigation.navigate(Route.ChooseWalletsForNotification, { email });
  };

  onChange = (email: string) => this.setState({ email, error: '' });

  render() {
    const { email, error } = this.state;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={<Button title={i18n._.confirm} disabled={!email} onPress={this.onConfirm} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.addYourEmailFor}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.addYourEmailForDescription}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
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
