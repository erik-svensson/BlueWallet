import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, InputItem } from 'app/components';
import { Route, RootStackParams, ConfirmAddressFlowType, Wallet, ActionMeta } from 'app/consts';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import { createNotificationEmail, CreateNotificationEmailAction } from 'app/state/notifications/actions';
import { unSubscribedWallets } from 'app/state/wallets/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.AddEmail>;
  route: RouteProp<RootStackParams, Route.AddEmail>;
  wallets: Wallet[];
  createNotificationEmail: (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
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
      wallets,
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
    if (wallets.length) {
      return navigation.navigate(Route.ChooseWalletsForNotification, { email });
    } else {
      return navigation.navigate(Route.ConfirmEmail, {
        email,
        flowType: ConfirmAddressFlowType.FIRST_ADDRESS,
        walletsToSubscribe,
      });
    }
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
const mapStateToProps = (state: ApplicationState) => {
  return {
    wallets: unSubscribedWallets(state),
  };
};

const mapDispatchToProps = {
  createNotificationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailScreen);

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
