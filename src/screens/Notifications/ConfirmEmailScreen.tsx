import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, FlatButton, CodeInput } from 'app/components';
import {
  Route,
  MainCardStackNavigatorParams,
  RootStackParams,
  ConfirmAddressFlowType,
  CONST,
  ActionMeta,
  WalletPayload,
} from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { walletToAddressesGenerationBase, getWalletHashedPublicKeys } from 'app/helpers/wallets';
import { ApplicationState } from 'app/state';
import { selectors as appSettingsSelectors } from 'app/state/appSettings';
import {
  authenticateEmail,
  AuthenticateEmailAction,
  createNotificationEmail,
  CreateNotificationEmailAction,
  subscribeWallet,
  SubscribeWalletAction,
  unsubscribeWallet,
  UnsubscribeWalletAction,
  setNotificationEmail,
  SetNotificationEmailAction,
} from 'app/state/notifications/actions';
import { sessionToken, notificationError, storedEmail, storedPin } from 'app/state/notifications/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.ConfirmEmail>
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.ConfirmEmail>;
  createNotificationEmail: (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
  subscribe: (wallets: WalletPayload[], email: string, lang: string) => SubscribeWalletAction;
  unsubscribe: (hashes: string[], email: string) => UnsubscribeWalletAction;
  authenticate: (session_token: string, pin: string, meta: ActionMeta) => AuthenticateEmailAction;
  setNotificationEmail: (email: string) => SetNotificationEmailAction;
  language: string;
  sessionToken: string;
  notificationError: string;
  storedEmail: string;
  storedPin: string;
}

interface State {
  code: string;
  failNo: number;
  error: string;
}

class ConfirmEmailScreen extends Component<Props, State> {
  state = {
    code: '',
    error: '',
    failNo: 0,
  };

  async componentDidMount() {
    const {
      route: {
        params: { walletsToSubscribe, email, flowType },
      },
      language,
    } = this.props;
    if (!!walletsToSubscribe) {
      if (flowType === ConfirmAddressFlowType.UNSUBSCRIBE) {
        const hashes = await Promise.all(walletsToSubscribe.map(wallet => getWalletHashedPublicKeys(wallet)));
        this.props.unsubscribe(hashes, email);
      } else {
        const walletsToSubscribePayload = await Promise.all(
          walletsToSubscribe!.map(wallet => walletToAddressesGenerationBase(wallet)),
        );
        this.props.subscribe(walletsToSubscribePayload, email, language);
      }
    } else {
      this.props.setNotificationEmail(email);
    }
  }

  get infoContainerContent() {
    switch (this.props.route.params.flowType) {
      case ConfirmAddressFlowType.FIRST_ADDRESS:
        return this.firstAddressFlowContent();
      case ConfirmAddressFlowType.CURRENT_ADDRESS:
        return this.currentAddressFlowContent();
      case ConfirmAddressFlowType.NEW_ADDRESS:
        return this.newAddressFlowContent();
      case ConfirmAddressFlowType.DELETE_ADDRESS:
        return this.deleteAddressFlowContent();
      case ConfirmAddressFlowType.ANOTHER_ACTION:
        return this.anotherActionFlowContent();
      case ConfirmAddressFlowType.UNSUBSCRIBE:
        return this.anotherActionFlowContent();
      case ConfirmAddressFlowType.RECEIVE_NOTIFICATIONS_CONFIRMATION_IMPORT:
        return this.receiveNotificationsConfirmationImportFlowContent();
      case ConfirmAddressFlowType.RECEIVE_NOTIFICATIONS_CONFIRMATION_CREATE:
        return this.receiveNotificationsConfirmationCreateFlowContent();
    }
  }

  firstAddressFlowContent = () => {
    const {
      navigation,
      route: {
        params: { walletsToSubscribe },
      },
    } = this.props;
    return {
      title: i18n.notifications.confirmEmail,
      description: i18n.notifications.pleaseEnter,
      onCodeConfirm: () => {
        return CreateMessage({
          title: i18n.message.success,
          description: walletsToSubscribe
            ? i18n.notifications.walletSubscribedSuccessMessage
            : i18n.notifications.emailAddedSuccessMessage,
          type: MessageType.success,
          buttonProps: {
            title: i18n.notifications.goToNotifications,
            onPress: () => navigation.navigate(Route.Notifications, {}),
          },
        });
      },
    };
  };

  currentAddressFlowContent = () => {
    const {
      navigation,
      route: {
        params: { newAddress },
      },
    } = this.props;
    if (!newAddress) return;
    return {
      title: i18n.notifications.confirmCurrentTitle,
      description: i18n.notifications.confirmCurrentDescription,
      onCodeConfirm: () => {
        this.setState({ code: '' }, () =>
          navigation.navigate(Route.ConfirmEmail, {
            email: newAddress,
            flowType: ConfirmAddressFlowType.NEW_ADDRESS,
          }),
        );
      },
    };
  };

  newAddressFlowContent = () => ({
    title: i18n.notifications.confirmNewTitle,
    description: i18n.notifications.confirmNewDescription,
    onCodeConfirm: () =>
      CreateMessage({
        title: i18n.message.success,
        description: i18n.notifications.emailChangedSuccessMessage,
        type: MessageType.success,
        buttonProps: {
          title: i18n.notifications.goToNotifications,
          onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
        },
      }),
  });

  deleteAddressFlowContent = () => ({
    title: i18n.notifications.verifyAction,
    description: i18n.notifications.verifyActionDescription,
    onCodeConfirm: () =>
      CreateMessage({
        title: i18n.message.success,
        description: i18n.notifications.deleteEmailSuccessMessage,
        type: MessageType.success,
        buttonProps: {
          title: i18n.notifications.goToNotifications,
          onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
        },
      }),
  });

  anotherActionFlowContent = () => {
    const {
      navigation,
      route: {
        params: { onBack },
      },
    } = this.props;
    return {
      title: i18n.notifications.verifyAction,
      description: i18n.notifications.verifyActionDescription,
      onCodeConfirm: () =>
        CreateMessage({
          title: i18n.message.success,
          description: i18n.notifications.updateNotificationPreferences,
          type: MessageType.success,
          buttonProps: {
            title: i18n.message.goToWalletDetails,
            onPress: () => (onBack ? onBack() : navigation.popToTop()),
          },
        }),
    };
  };

  receiveNotificationsConfirmationImportFlowContent = () => ({
    title: i18n.notifications.verifyAction,
    description: i18n.notifications.pleaseEnter,
    onCodeConfirm: () =>
      CreateMessage({
        title: i18n.message.hooray,
        description: i18n.message.successfullWalletImport,
        type: MessageType.success,
        buttonProps: {
          title: i18n.message.returnToDashboard,
          onPress: () => this.props.navigation.navigate(Route.Dashboard),
        },
      }),
  });

  receiveNotificationsConfirmationCreateFlowContent = () => ({
    title: i18n.notifications.verifyAction,
    description: i18n.notifications.pleaseEnter,
    onCodeConfirm: () => this.props.navigation.navigate(Route.Dashboard),
  });

  onError = () => {
    const newFailNo = this.state.failNo + 1;
    const errorMessage =
      newFailNo < 3
        ? i18n.formatString(i18n.notifications.codeError, { attemptsLeft: CONST.emailCodeErrorMax - newFailNo })
        : i18n.formatString(i18n.notifications.codeFinalError, { attemptsNo: CONST.emailCodeErrorMax });
    return this.setState({
      code: '',
      failNo: newFailNo,
      error: errorMessage,
    });
  };

  comparePin = () =>
    this.state.code === this.props.storedPin ? this.infoContainerContent?.onCodeConfirm() : this.onError();

  onConfirm = () => {
    const {
      sessionToken,
      notificationError,
      storedEmail,
      createNotificationEmail,
      route: {
        params: { walletsToSubscribe, email },
      },
    } = this.props;
    if (walletsToSubscribe?.length) {
      if (!storedEmail && email) {
        createNotificationEmail(email);
      }
      this.props.authenticate(sessionToken, this.state.code, {
        onFailure: () => Alert.alert('error', notificationError),
        onSuccess: () => {
          this.infoContainerContent?.onCodeConfirm();
        },
      });
    } else {
      this.comparePin();
    }
  };

  onChange = (code: string) =>
    this.setState({ code, error: '', failNo: this.state.failNo >= CONST.emailCodeErrorMax ? 0 : this.state.failNo });

  onResend = () => {};

  render() {
    const { email } = this.props.route.params;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={
          <>
            <Button
              title={i18n._.confirm}
              onPress={this.onConfirm}
              disabled={this.state.code.length !== CONST.codeLength}
            />
            {/* <FlatButton // uncomment when api for resend works
              containerStyle={styles.resendButton}
              title={i18n.notifications.resend}
              onPress={this.onResend}
            /> */}
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{this.infoContainerContent?.title}</Text>
          <Text style={styles.infoDescription}>
            {this.infoContainerContent?.description}
            <Text style={styles.email}>{`\n${email}`}</Text>
          </Text>
        </View>
        <View style={styles.inputItemContainer}>
          <CodeInput value={this.state.code} onTextChange={this.onChange} isError={!!this.state.error} />
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  language: appSettingsSelectors.language(state),
  sessionToken: sessionToken(state),
  notificationError: notificationError(state),
  storedEmail: storedEmail(state),
  storedPin: storedPin(state),
});

const mapDispatchToProps = {
  createNotificationEmail,
  subscribe: subscribeWallet,
  unsubscribe: unsubscribeWallet,
  authenticate: authenticateEmail,
  setNotificationEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailScreen);

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
    height: 100,
    marginHorizontal: 25,
  },
  resendButton: {
    marginTop: 12,
  },
  email: {
    ...typography.subtitle6,
    color: palette.textBlack,
  },
  error: {
    ...typography.subtitle2,
    color: palette.textRed,
    textAlign: 'center',
  },
});
