import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, RootStackParams, Wallet, ActionMeta, ConfirmAddressFlowType } from 'app/consts';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import { selectors as notificationSelectors } from 'app/state/notifications';
import {
  createNotificationEmail as createNotificationEmailAction,
  verifyNotificationEmail as verifyNotificationEmailAction,
  checkSubscription as checkSubscriptionAction,
  CheckSubscriptionAction,
  VerifyNotificationEmailActionFunction,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.AddNotificationEmail>;
  route: RouteProp<RootStackParams, Route.AddNotificationEmail>;

  createNotificationEmail: Function;
  verifyNotificationEmail: VerifyNotificationEmailActionFunction;
  hasWallets: boolean;
  wallets: Wallet[];
  error: string;
  checkSubscription: (wallets: Wallet[], email: string, meta?: ActionMeta) => CheckSubscriptionAction;
}

type State = {
  email: string;
  localError: string;
};

class AddNotificationEmailScreen extends PureComponent<Props, State> {
  state = {
    email: '',
    localError: '',
  };

  setEmail = (email: string): void => {
    this.setState({
      email,
      localError: '',
    });
  };

  goToLocalEmailConfirm = () => {
    const { verifyNotificationEmail, navigation, createNotificationEmail, route } = this.props;

    const { onSuccess, title } = route.params;

    const { email } = this.state;

    verifyNotificationEmail(email, {
      onSuccess: () =>
        navigation.navigate(Route.LocalConfirmNotificationCode, {
          children: (
            <View style={styles.infoContainer}>
              <Text style={typography.headline4}>{i18n.notifications.confirmEmail}</Text>
              <Text style={styles.codeDescription}>{i18n.notifications.pleaseEnter}</Text>
              <Text style={typography.headline5}>{email}</Text>
            </View>
          ),
          title,
          onSuccess: () => {
            createNotificationEmail(email, {
              onSuccess,
            });
          },
          email,
        }),
    });
  };

  onConfirm = () => {
    const { email } = this.state;
    const { navigation, route, checkSubscription, wallets } = this.props;
    const { onSuccess } = route.params;

    if (!isEmail(email)) {
      return this.setState({
        localError: i18n.onboarding.emailValidation,
      });
    }
    if (!wallets.length) {
      return this.goToLocalEmailConfirm();
    }
    checkSubscription(wallets, email, {
      onSuccess: (ids: string[]) => {
        const walletsToSubscribe = wallets.filter(w => !ids.includes(w.id));
        if (!walletsToSubscribe.length) {
          return this.goToLocalEmailConfirm();
        }
        navigation.navigate(Route.ChooseWalletsForNotification, {
          flowType: ConfirmAddressFlowType.SUBSCRIBE,
          subtitle: i18n.notifications.getNotification,
          description: i18n.notifications.chooseWalletsDescription,
          email,
          onSuccess,
          wallets: walletsToSubscribe,
          onSkip: () => this.goToLocalEmailConfirm(),
        });
      },
      onFailure: () => this.setState({ localError: this.props.error }),
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
    const { email, localError } = this.state;
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
          <Text style={typography.headline4}>{i18n.notifications.addYourEmailFor}</Text>
          <Text style={styles.pinDescription}>{description}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
            label={i18n._.email}
            testID="confirm-notification-email"
            setValue={this.setEmail}
            autoFocus={true}
            error={localError}
            secureTextEntry={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps = {
  createNotificationEmail: createNotificationEmailAction,
  verifyNotificationEmail: verifyNotificationEmailAction,
  checkSubscription: checkSubscriptionAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: walletsSelectors.subscribableWallets(state),
  error: notificationSelectors.readableError(state),
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
