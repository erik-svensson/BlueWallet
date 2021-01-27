import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { messages } from 'app/../error';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, FlatButton, CodeInput } from 'app/components';
import {
  Route,
  RootStackParams,
  ConfirmAddressFlowType,
  CONST,
  ActionMeta,
  WalletPayload,
  InfoContainerContent,
  Wallet,
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
} from 'app/state/notifications/actions';
import { sessionToken, readableError, storedEmail } from 'app/state/notifications/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ConfirmEmail>;
  route: RouteProp<RootStackParams, Route.ConfirmEmail>;
  createNotificationEmail: (email: string, meta?: ActionMeta) => CreateNotificationEmailAction;
  subscribe: (wallets: WalletPayload[], email: string, lang: string) => SubscribeWalletAction;
  unsubscribe: (hashes: string[], email: string) => UnsubscribeWalletAction;
  authenticate: (session_token: string, pin: string, meta: ActionMeta) => AuthenticateEmailAction;
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
    this.infoContainerContent.onInit?.();
  }

  get infoContainerContent(): InfoContainerContent {
    switch (this.props.route.params.flowType) {
      case ConfirmAddressFlowType.SUBSCRIBE:
        return this.subscribeFlowContent();
      case ConfirmAddressFlowType.UNSUBSCRIBE:
        return this.unsubscribeFlowContent();
      default:
        return {};
    }
  }

  subscribeFlowContent = () => {
    const {
      navigation,
      language,
      createNotificationEmail,
      storedEmail,
      route: {
        params: { email, walletsToSubscribe, onSuccess, onBack },
      },
    } = this.props;
    return {
      title: i18n.notifications.verifyAction,
      description: i18n.notifications.verifyActionDescription,
      onInit: async () => {
        const walletsToSubscribePayload = await Promise.all(
          walletsToSubscribe!.map((wallet: Wallet) => walletToAddressesGenerationBase(wallet)),
        );
        this.props.subscribe(walletsToSubscribePayload, email, language);
      },
      onCodeConfirm: () => {
        !storedEmail && createNotificationEmail(email);
        // TODO: Refactor, needed for now for other flows like wallet details sub/unsub, craete/import wallet, all flow should pass onSuccess method
        onSuccess
          ? onSuccess()
          : CreateMessage({
              title: i18n.message.success,
              description: i18n.notifications.updateNotificationPreferences,
              type: MessageType.success,
              buttonProps: {
                title: i18n.message.goToWalletDetails,
                onPress: () => (onBack ? onBack() : navigation.popToTop()),
              },
            });
      },
    };
  };

  unsubscribeFlowContent = () => {
    const {
      navigation,
      route: {
        params: { onBack, email, walletsToSubscribe, onSuccess },
      },
    } = this.props;
    return {
      title: i18n.notifications.verifyAction,
      description: i18n.notifications.verifyActionDescription,
      onInit: async () => {
        const hashes = await Promise.all(walletsToSubscribe!.map(wallet => getWalletHashedPublicKeys(wallet)));
        this.props.unsubscribe(hashes, email);
      },
      onCodeConfirm: () => {
        onSuccess
          ? // TODO: Refactor, needed for now for other flows like wallet details sub/unsub, craete/import wallet, all flow should pass onSuccess method
            onSuccess()
          : CreateMessage({
              title: i18n.message.success,
              description: i18n.notifications.updateNotificationPreferences,
              type: MessageType.success,
              buttonProps: {
                title: i18n.message.goToWalletDetails,
                onPress: () => (onBack ? onBack() : navigation.popToTop()),
              },
            });
      },
    };
  };

  onError = () => {
    if (this.props.notificationError === messages.alreadySubscribedReadable) {
      return this.setState({
        error: this.props.notificationError,
        code: '',
      });
    }
    const newFailNo = this.state.failNo + 1;
    const errorMessage =
      newFailNo < CONST.emailCodeErrorMax
        ? i18n.formatString(i18n.notifications.codeError, { attemptsLeft: CONST.emailCodeErrorMax - newFailNo })
        : i18n.formatString(i18n.notifications.codeFinalError, { attemptsNo: CONST.emailCodeErrorMax });
    return this.setState(
      {
        code: '',
        failNo: newFailNo,
        error: errorMessage,
      },
      () => {
        if (newFailNo === CONST.emailCodeErrorMax) {
          this.infoContainerContent?.onInit?.();
        }
      },
    );
  };

  onConfirm = () => {
    const { sessionToken } = this.props;
    const { code } = this.state;

    this.props.authenticate(sessionToken, code, {
      onFailure: this.onError,
      onSuccess: this.infoContainerContent.onCodeConfirm,
    });
  };

  onChange = (code: string) =>
    this.setState({ code, error: '', failNo: this.state.failNo >= CONST.emailCodeErrorMax ? 0 : this.state.failNo });

  onResend = () => {};

  render() {
    const { email, onBack } = this.props.route.params;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} onBackArrow={onBack} />}
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
            />  TODO uncomment when resend is ready on backend */}
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
  notificationError: readableError(state),
  storedEmail: storedEmail(state),
});

const mapDispatchToProps = {
  createNotificationEmail,
  subscribe: subscribeWallet,
  unsubscribe: unsubscribeWallet,
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
