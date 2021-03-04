import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button } from 'app/components';
import { Route, RootStackParams, Wallet, ConfirmAddressFlowType } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import { selectors as notificationsSelectors } from 'app/state/notifications';
import {
  createNotificationEmail as createNotificationEmailAction,
  verifyNotificationEmail as verifyNotificationEmailAction,
  checkSubscription as checkSubscriptionAction,
  CheckSubscriptionActionCreator,
  VerifyNotificationEmailActionCreator,
  SetErrorActionCreator,
  setError as setErrorAction,
  CreateNotificationEmailActionCreator,
  updateNotificationEmail as updateNotificationEmailAction,
  UpdateNotificationEmailActionCreator,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.UpdateEmailNotification>;
  route: RouteProp<RootStackParams, Route.UpdateEmailNotification>;
  createNotificationEmail: CreateNotificationEmailActionCreator;
  setError: SetErrorActionCreator;
  verifyNotificationEmail: VerifyNotificationEmailActionCreator;
  wallets: Wallet[];
  error: string;
  isLoading: boolean;
  checkSubscription: CheckSubscriptionActionCreator;
  storedEmail: string;
  updateNotificationEmail: UpdateNotificationEmailActionCreator;
}

type State = {
  email: string;
};

class UpdateEmailNotificationScreen extends PureComponent<Props, State> {
  state = {
    email: '',
  };

  componentDidMount() {
    this.props.setError('');
  }

  setEmail = (email: string): void => {
    this.props.error && this.props.setError('');
    this.setState({
      email,
    });
  };

  goToLocalEmailConfirm = () => {
    const { verifyNotificationEmail, navigation } = this.props;

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
      title: i18n.notifications.notifications,
      onSuccess: this.onUpdateSuccess,
      email,
    });
  };

  onUpdateSuccess = () =>
    this.props.createNotificationEmail(this.state.email, {
      onSuccess: () => {
        CreateMessage({
          title: i18n.contactCreate.successTitle,
          description: i18n.notifications.emailChangedSuccessMessage,
          type: MessageType.success,
          buttonProps: {
            title: i18n.notifications.goToNotifications,
            onPress: this.goBackToNotificationScreen,
          },
        });
      },
    });

  authenticateCurrentEmail = () => {
    return this.props.navigation.navigate(Route.ConfirmEmail, {
      email: this.props.storedEmail,
      flowType: ConfirmAddressFlowType.UPDATE_CURRENT,
      onSuccess: () => {
        this.props.navigation.goBack();
        this.authenticateNewEmail();
      },
      onBack: this.goBackToNotificationScreen,
      onResend: this.onResend,
    });
  };

  authenticateNewEmail = () => {
    const { email } = this.state;
    const { navigation } = this.props;

    return navigation.navigate(Route.ConfirmEmail, {
      email,
      flowType: ConfirmAddressFlowType.UPDATE_NEW,
      onSuccess: this.onUpdateSuccess,
      onBack: this.goBackToNotificationScreen,
      onResend: () => {
        this.props.navigation.goBack();
        this.authenticateCurrentEmail();
        this.onResend();
      },
    });
  };

  onResend = () =>
    this.props.updateNotificationEmail(
      this.props.route.params.subscribedWallets,
      this.props.storedEmail,
      this.state.email,
    );

  onConfirm = () => {
    const { email } = this.state;
    const { route, setError, storedEmail, updateNotificationEmail } = this.props;
    const { subscribedWallets } = route.params;

    if (!isEmail(email)) {
      return setError(i18n.notifications.invalidAddressError);
    }
    if (email === storedEmail) {
      return setError(i18n.notifications.theSameAddressError);
    }

    if (!subscribedWallets.length) {
      return this.goToLocalEmailConfirm();
    }
    updateNotificationEmail(subscribedWallets, storedEmail, email, {
      onSuccess: this.authenticateCurrentEmail,
    });
  };

  goBackToNotificationScreen = () =>
    this.props.navigation.navigate(Route.Notifications, {
      onBackArrow: () => this.props.navigation.pop(),
    });

  render() {
    const { email } = this.state;
    const { error, isLoading, storedEmail } = this.props;

    return (
      <ScreenTemplate
        noScroll
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              testID="change-email-confirm-button"
              title={i18n._.confirm}
              onPress={this.onConfirm}
              disabled={email.length === 0}
              loading={isLoading}
            />
          </>
        }
        header={
          <Header title={i18n.notifications.notifications} isBackArrow onBackArrow={this.goBackToNotificationScreen} />
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.changeEmailTitle}</Text>
          <Text style={styles.pinDescription}>{i18n.notifications.changeEmailDescription}</Text>
        </View>
        <View style={styles.currentAddress}>
          <Text style={styles.inputLabel}>{i18n.notifications.yourCurrentEmail}</Text>
          <Text testID="current-email-text" style={styles.email}>
            {storedEmail}
          </Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
            label={i18n._.email}
            testID="change-email-input"
            setValue={this.setEmail}
            autoFocus={true}
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
  updateNotificationEmail: updateNotificationEmailAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  wallets: walletsSelectors.wallets(state),
  isLoading: notificationsSelectors.isLoading(state),
  error: notificationsSelectors.readableError(state),
  storedEmail: notificationsSelectors.storedEmail(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmailNotificationScreen);

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
  codeDescription: {
    ...typography.caption,
    color: palette.textGrey,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  currentAddress: {
    width: '100%',
    borderBottomColor: palette.grey,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inputLabel: {
    ...typography.overline,
    color: palette.textGrey,
    marginBottom: 4,
  },
  email: { ...typography.caption, color: palette.textBlack },
});
