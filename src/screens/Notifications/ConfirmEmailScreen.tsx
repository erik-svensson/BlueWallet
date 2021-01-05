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
  Wallet,
} from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import { selectors as appSettingsSelectors } from 'app/state/appSettings';
import {
  authenticateEmail,
  AuthenticateEmailAction,
  createNotificationEmail,
  CreateNotificationEmailAction,
  subscribeWallet,
  SubscribeWalletAction,
} from 'app/state/notifications/actions';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.ConfirmEmail>
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.ConfirmEmail>;
  createNotificationEmail: (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
  subscribe: (wallets: Wallet[], email: string, lang: string) => SubscribeWalletAction;
  authenticate: (session_token: string, pin: number) => AuthenticateEmailAction;
  language: string;
  sessionToken: string;
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

  componentDidMount() {
    const {
      route: {
        params: { walletsToSubscribe, address },
      },
      language,
    } = this.props;
    const testingWallet = [
      {
        name: 'wallet test1ds2025',
        xpub:
          'zpub6n6UcSMKtH26Rk5Tjiww61iyJH2F3fdkJrsnvM1Fyyo5PLd18EEkgB89h5uMSTmWDQfFDdbGwhSbUoPQXLdj8yn43XLjdX5G85BhUZz3hhF',
        derivation_path: ["m/0'"],
        gap_limit: 20,
        address_type: 'p2sh',
        recovery_public_key: '038617eced2b2a429d1c30c42917eb1aae30e0302d30ecc85c74cd30ce12384469',
        instant_public_key: '0389ce37c28f2909d691827e0a166f95342a7e5eddf69d95552d1bce7256e63cdc',
      },
    ];
    this.props.subscribe(testingWallet || [], address, language);
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
        params: { address, walletsToSubscribe },
      },
    } = this.props;
    return {
      title: i18n.notifications.confirmEmail,
      description: i18n.notifications.pleaseEnter,
      onCodeConfirm: () => {
        if (walletsToSubscribe) {
          // verify code and subscribe certain wallet to email address
          return CreateMessage({
            title: i18n.message.success,
            description: i18n.notifications.walletSubscribedSuccessMessage,
            type: MessageType.success,
            buttonProps: {
              title: i18n.notifications.goToNotifications,
              onPress: () => this.props.navigation.navigate(Route.Notifications, {}),
            },
          });
        }
        navigation.navigate(Route.ChooseWalletsForNotification, { address });
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
    return {
      title: i18n.notifications.confirmCurrentTitle,
      description: i18n.notifications.confirmCurrentDescription,
      onCodeConfirm: () => {
        this.setState({ code: '' }, () =>
          navigation.navigate(Route.ConfirmEmail, {
            address: newAddress!,
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

  onConfirm = () => {
    const {
      sessionToken,
      route: {
        params: { walletsToSubscribe },
      },
    } = this.props;
    if (walletsToSubscribe?.length) {
      this.props.authenticate(sessionToken, parseInt(this.state.code));
    }
    return this.props.createNotificationEmail(this.props.route.params.address, {
      onFailure: () => Alert.alert('error'),
      onSuccess: () => {
        this.infoContainerContent.onCodeConfirm();
      },
    });
  };

  onChange = (code: string) =>
    this.setState({ code, error: '', failNo: this.state.failNo >= CONST.emailCodeErrorMax ? 0 : this.state.failNo });

  onResend = () => {};

  render() {
    const { address, walletsToSubscribe } = this.props.route.params;
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
            <FlatButton
              containerStyle={styles.resendButton}
              title={i18n.notifications.resend}
              onPress={this.onResend}
            />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{this.infoContainerContent.title}</Text>
          <Text style={styles.infoDescription}>
            {this.infoContainerContent.description}
            <Text style={styles.address}>{`\n${address}`}</Text>
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
  sessionToken: state.notifications.sessionToken,
});

const mapDispatchToProps = {
  createNotificationEmail,
  subscribe: subscribeWallet,
  authenticate: authenticateEmail,
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
  address: {
    ...typography.subtitle6,
    color: palette.textBlack,
  },
  error: {
    ...typography.subtitle2,
    color: palette.textRed,
    textAlign: 'center',
  },
});
