import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, RootStackParams, Wallet, ActionMeta, ConfirmAddressFlowType } from 'app/consts';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import { selectors as notificationsSelectors } from 'app/state/notifications';
import {
  createNotificationEmail as createNotificationEmailAction,
  verifyNotificationEmail as verifyNotificationEmailAction,
  checkSubscription as checkSubscriptionAction,
  CheckSubscriptionAction,
  VerifyNotificationEmailActionCreator,
  SetErrorActionCreator,
  setError as setErrorAction,
  CreateNotificationEmailActionCreator,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.AddNotificationEmail>;
  route: RouteProp<RootStackParams, Route.AddNotificationEmail>;
  createNotificationEmail: CreateNotificationEmailActionCreator;
  setError: SetErrorActionCreator;
  verifyNotificationEmail: VerifyNotificationEmailActionCreator;
  wallets: Wallet[];
  wallet: Wallet;
  error: string;
  isLoading: boolean;
  checkSubscription: (wallets: Wallet[], email: string, meta?: ActionMeta) => CheckSubscriptionAction;
}

type State = {
  email: string;
};

class AddNotificationEmailScreen extends PureComponent<Props, State> {
  state = {
    email: '',
  };

  addListenerResetStateOnNavigationFocus = () =>
    this.props.navigation.addListener('focus', () => {
      this.setState({ email: '' });
    });

  removeListenerResetStateOnNavigationFocus = () =>
    this.props.navigation.removeListener('focus', () => {
      this.setState({ email: '' });
    });

  componentDidMount() {
    this.props.setError('');
    this.addListenerResetStateOnNavigationFocus();
  }

  componentWillUnmount() {
    this.removeListenerResetStateOnNavigationFocus();
  }

  setEmail = (email: string): void => {
    !!this.props.error && this.props.setError('');
    this.setState({
      email,
    });
  };

  goToLocalEmailConfirm = () => {
    const { verifyNotificationEmail, navigation, createNotificationEmail, route } = this.props;

    const { onSuccess, title } = route.params;

    const { email } = this.state;

    verifyNotificationEmail(email);
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
    });
  };

  onConfirm = () => {
    const { email } = this.state;
    const { navigation, route, checkSubscription, wallets, setError } = this.props;
    const { onSuccess, wallet } = route.params;

    if (!isEmail(email)) {
      return setError(i18n.notifications.invalidAddressError);
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
          wallet,
          wallets: walletsToSubscribe,
          onSkip: this.goToLocalEmailConfirm,
        });
      },
    });
  };

  skipAddEmail = () => {
    const { createNotificationEmail, route } = this.props;
    const { onSkipSuccess } = route.params;

    createNotificationEmail('', {
      onSuccess: () => {
        this.props.navigation.popToTop();
        onSkipSuccess?.();
      },
    });
  };

  onBackArrow = () => {
    const { navigation, wallet } = this.props;

    navigation.navigate(Route.Notifications, {
      onBackArrow: () => {
        navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Settings });
      },
      wallet,
    });
  };

  render() {
    const { email } = this.state;
    const { error, route, isLoading } = this.props;

    const { onSkipSuccess, title, isBackArrow, description, inputAutofocus } = route.params;

    return (
      <ScreenTemplate
        noScroll
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n._.confirm}
              testID="submit-add-email-button"
              onPress={this.onConfirm}
              disabled={email.length === 0}
              loading={isLoading}
            />
            {onSkipSuccess && (
              <FlatButton
                testID="skip-adding-email-button"
                containerStyle={styles.skipButton}
                title={i18n._.skip}
                loading={isLoading}
                onPress={this.skipAddEmail}
              />
            )}
          </>
        }
        header={<Header title={title} isBackArrow={isBackArrow} onBackArrow={this.onBackArrow} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.addYourEmailFor}</Text>
          <Text style={styles.pinDescription}>{description}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
            label={i18n._.email}
            testID="add-email-input"
            setValue={this.setEmail}
            autoFocus={inputAutofocus}
            error={error}
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
  setError: setErrorAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: walletsSelectors.wallets(state),
  isLoading: notificationsSelectors.isLoading(state),
  error: notificationsSelectors.readableError(state),
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
