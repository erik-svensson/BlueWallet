import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, RootStackParams, Wallet, ActionMeta } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import {
  createNotificationEmail as createNotificationEmailAction,
  setNotificationEmail as setNotificationEmailAction,
  checkSubscription as checkSubscriptionAction,
  CheckSubscriptionAction,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.AddNotificationEmail>;
  route: RouteProp<RootStackParams, Route.AddNotificationEmail>;

  createNotificationEmail: Function;
  setNotificationEmail: Function;
  hasWallets: boolean;
  wallets: Wallet[];
  checkSubscription: (wallets: Wallet[], email: string, meta?: ActionMeta) => CheckSubscriptionAction;
}

type State = {
  email: string;
  error: string;
};

class AddNotificationEmailScreen extends PureComponent<Props, State> {
  state = {
    email: '',
    error: '',
  };

  setEmail = (email: string): void => {
    this.setState({
      email,
    });
  };

  goToLocalEmailConfirm = () => {
    const { setNotificationEmail, navigation, createNotificationEmail, route } = this.props;

    const { onSuccess, title } = route.params;

    const { email } = this.state;

    setNotificationEmail(email, {
      onSuccess: () =>
        navigation.navigate(Route.LocalConfirmNotificationCode, {
          children: (
            <View style={styles.infoContainer}>
              <Text style={typography.headline4}>{i18n.onboarding.confirmEmail}</Text>
              <Text style={styles.codeDescription}>{i18n.onboarding.confirmEmailDescription}</Text>
              <Text style={typography.headline5}>{email}</Text>
            </View>
          ),
          title,
          onSuccess: () => {
            createNotificationEmail(email, {
              onSuccess,
            });
          },
        }),
    });
  };

  onConfirm = () => {
    const { email } = this.state;
    const { navigation, hasWallets, route, checkSubscription, wallets } = this.props;
    const { onSuccess } = route.params;

    if (!isEmail(email)) {
      return this.setState({
        error: i18n.onboarding.emailValidation,
      });
    }
    if (!hasWallets) {
      return this.goToLocalEmailConfirm();
    }
    checkSubscription(wallets, email, {
      onSuccess: (ids: string[]) => {
        const walletsToSubscribe = wallets.filter(w => !ids.includes(w.id));
        if (!walletsToSubscribe.length) {
          return this.goToLocalEmailConfirm();
        }
        navigation.navigate(Route.ChooseWalletsForNotification, {
          email,
          onSuccess,
          walletsToSubscribe,
          onSkip: () => this.goToLocalEmailConfirm(),
        });
      },
      onFailure: (error: string) => {
        this.setState({ error });
      },
    });
  };

  skipAddEmail = () => {
    const { createNotificationEmail, route } = this.props;
    const { onSkipSuccess } = route.params;

    createNotificationEmail('', {
      onSuccess: onSkipSuccess,
    });
  };

  render() {
    const { email, error } = this.state;

    const { onSkipSuccess, title, isBackArrow, description } = this.props.route.params;
    return (
      <ScreenTemplate
        noScroll
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n._.confirm}
              testID="submit-notification-email"
              onPress={this.onConfirm}
              disabled={email.length === 0}
            />
            {onSkipSuccess && (
              <FlatButton
                testID="skip-notification-email"
                containerStyle={styles.skipButton}
                title={i18n._.skip}
                onPress={this.skipAddEmail}
              />
            )}
          </>
        }
        header={<Header title={title} isBackArrow={isBackArrow} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.notification}</Text>
          <Text style={styles.pinDescription}>{description}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
            label={i18n._.email}
            testID="confirm-notification-email"
            setValue={this.setEmail}
            autoFocus={true}
            error={error}
            secureTextEntry={false}
            autoCapitalize="none"
          />
        </View>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps = {
  createNotificationEmail: createNotificationEmailAction,
  setNotificationEmail: setNotificationEmailAction,
  checkSubscription: checkSubscriptionAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  hasWallets: walletsSelectors.hasWallets(state),
  wallets: walletsSelectors.wallets(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotificationEmailScreen);

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  pinDescription: {
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
  skipButton: {
    marginTop: 12,
  },
  codeDescription: {
    ...typography.caption,
    color: palette.textGrey,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
});
