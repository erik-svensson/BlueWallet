import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button } from 'app/components';
import { Route, RootStackParams, Wallet, ActionMeta } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { isEmail } from 'app/helpers/helpers';
import { getWalletHashedPublicKeys } from 'app/helpers/wallets';
import { ApplicationState } from 'app/state';
import { selectors as notificationsSelectors } from 'app/state/notifications';
import {
  createNotificationEmail as createNotificationEmailAction,
  verifyNotificationEmail as verifyNotificationEmailAction,
  checkSubscription as checkSubscriptionAction,
  CheckSubscriptionAction,
  VerifyNotificationEmailActionFunction,
  SetErrorActionFunction,
  setError as setErrorAction,
  CreateNotificationEmailActionFunction,
  updateNotificationEmail as updateNotificationEmailAction,
  UpdateNotificationEmailFunction,
  updateNotificationEmailSuccess as updateNotificationEmailSuccessAction,
  UpdateNotificationEmailSuccessAction,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.UpdateEmailNotification>;
  route: RouteProp<RootStackParams, Route.UpdateEmailNotification>;
  createNotificationEmail: CreateNotificationEmailActionFunction;
  setError: SetErrorActionFunction;
  verifyNotificationEmail: VerifyNotificationEmailActionFunction;
  subscribableWallets: Wallet[];
  error: string;
  isLoading: boolean;
  checkSubscription: (wallets: Wallet[], email: string, meta?: ActionMeta) => CheckSubscriptionAction;
  storedEmail: string;
  updateNotificationEmail: UpdateNotificationEmailFunction;
  updateNotificationEmailSuccess: (sessionToken: string) => UpdateNotificationEmailSuccessAction;
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
    this.props.setError('');
    this.setState({
      email,
    });
  };

  goToLocalEmailConfirm = () => {
    const { verifyNotificationEmail, navigation } = this.props;

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
          title: i18n.notifications.notifications,
          onSuccess: this.onUpdateSuccess,
          email,
        }),
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
            onPress: () => {
              this.props.navigation.navigate(Route.Notifications);
            },
          },
        });
      },
    });

  authenticateNewEmail = () => {
    const { email } = this.state;
    const { navigation, route } = this.props;
    const { subscribedWallets } = route.params;

    return navigation.navigate(Route.ConfirmEmail, {
      email,
      title: i18n.notifications.confirmNewTitle,
      description: `${i18n.notifications.verifyActionDescription} ${email}`,
      onSuccess: this.onUpdateSuccess,
      walletsToSubscribe: subscribedWallets,
    });
  };

  onConfirm = async () => {
    const { email } = this.state;
    const {
      navigation,
      route,
      subscribableWallets,
      setError,
      storedEmail,
      updateNotificationEmail,
      updateNotificationEmailSuccess,
    } = this.props;
    const { subscribedWallets } = route.params;
    if (!isEmail(email)) {
      return setError(i18n.onboarding.emailValidation);
    }
    if (!subscribableWallets.length) {
      return this.goToLocalEmailConfirm();
    }
    const hashes = await Promise.all(subscribableWallets!.map(wallet => getWalletHashedPublicKeys(wallet)));
    updateNotificationEmail(hashes, storedEmail, email, {
      onSuccess: () => {
        return navigation.navigate(Route.ConfirmEmail, {
          email: storedEmail,
          title: i18n.notifications.confirmCurrentTitle,
          description: `${i18n.notifications.verifyActionDescription} ${storedEmail}`,
          onSuccess: (sessionToken: string) => {
            // navigation.goBack();
            updateNotificationEmailSuccess(sessionToken);
            this.authenticateNewEmail();
          },
          walletsToSubscribe: subscribedWallets,
        });
      },
    });
  };

  render() {
    const { email } = this.state;
    const { error, isLoading, storedEmail } = this.props;
    return (
      <ScreenTemplate
        noScroll
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button title={i18n._.confirm} onPress={this.onConfirm} disabled={email.length === 0} loading={isLoading} />
          </>
        }
        header={<Header title={i18n.notifications.notifications} isBackArrow />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.changeEmailTitle}</Text>
          <Text style={styles.pinDescription}>{i18n.notifications.changeEmailDescription}</Text>
        </View>
        <View style={styles.currentAddress}>
          <Text style={styles.inputLabel}>{i18n.notifications.yourCurrentEmail}</Text>
          <Text style={styles.email}>{storedEmail}</Text>
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
  updateNotificationEmailSuccess: updateNotificationEmailSuccessAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  subscribableWallets: walletsSelectors.subscribableWallets(state),
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
