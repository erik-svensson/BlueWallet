import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, CodeInput, TimeoutButton } from 'app/components';
import { Route, RootStackParams, ConfirmAddressFlowType, CONST, InfoContainerContent } from 'app/consts';
import { ApplicationState } from 'app/state';
import {
  authenticateEmail,
  AuthenticateEmailActionCreator,
  createNotificationEmail,
  CreateNotificationEmailActionCreator,
  subscribeWallet,
  unsubscribeWallet,
  UnsubscribeWalletActionCreator,
  SubscribeWalletActionCreator,
  SetErrorActionCreator,
  setError as setErrorAction,
} from 'app/state/notifications/actions';
import { sessionToken, readableError, storedEmail, failedTries } from 'app/state/notifications/selectors';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ConfirmEmail>;
  route: RouteProp<RootStackParams, Route.ConfirmEmail>;
  createNotificationEmail: CreateNotificationEmailActionCreator;
  subscribe: SubscribeWalletActionCreator;
  unsubscribe: UnsubscribeWalletActionCreator;
  authenticate: AuthenticateEmailActionCreator;
  sessionToken: string;
  notificationError: string;
  storedEmail: string;
  storedPin: string;
  setError: SetErrorActionCreator;
  failedTries: number;
}

interface State {
  code: string;
}

class ConfirmEmailScreen extends Component<Props, State> {
  state = {
    code: '',
  };

  componentDidMount() {
    this.infoContainerContent.onInit?.();
    this.props.setError('');
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
      createNotificationEmail,
      storedEmail,
      route: {
        params: { email, wallets, onSuccess },
      },
    } = this.props;

    return {
      title: i18n.notifications.verifyAction,
      description: i18n.notifications.verifyActionDescription,
      onInit: () => {
        wallets && this.props.subscribe(wallets, email);
        // onInit: async () => {
        //   const walletsToSubscribePayload = await Promise.all(
        //     walletsToSubscribe!.map((wallet: Wallet) => walletToAddressesGenerationBase(wallet)),
        //   );

        //   this.props.subscribe(walletsToSubscribePayload, email, language);
      },
      onCodeConfirm: () => {
        if (storedEmail) {
          return onSuccess();
        }
        createNotificationEmail(email, { onSuccess });
      },
    };
  };

  unsubscribeFlowContent = () => {
    const {
      route: {
        params: { email, wallets, onSuccess },
      },
    } = this.props;

    return {
      title: i18n.notifications.verifyAction,
      description: i18n.notifications.verifyActionDescription,
      onInit: () => {
        wallets && this.props.unsubscribe(wallets, email);
        // onInit: async () => {
        //   const hashes = await Promise.all(walletsToSubscribe!.map(wallet => getWalletHashedPublicKeys(wallet)));

        //   this.props.unsubscribe(hashes, email);
      },
      onCodeConfirm: () => {
        onSuccess();
      },
    };
  };

  onError = () => {
    const { failedTries, setError } = this.props;

    this.setCode('');
    if (failedTries === CONST.emailCodeErrorMax) {
      this.infoContainerContent?.onInit?.();
      setError(i18n.formatString(i18n.notifications.codeFinalError, { attemptsLeft: CONST.emailCodeErrorMax }));
    }
    // const newFailNo = this.state.failNo + 1;
    // const errorMessage =
    //   newFailNo < CONST.emailCodeErrorMax
    //     ? i18n.formatString(i18n.notifications.codeError, { attemptsLeft: CONST.emailCodeErrorMax - newFailNo })
    //     : i18n.formatString(i18n.notifications.codeFinalError, { attemptsNo: CONST.emailCodeErrorMax });

    // return this.setState(
    //   {
    //     code: '',
    //     failNo: newFailNo,
    //     error: errorMessage,
    //   },
    //   () => {
    //     if (newFailNo === CONST.emailCodeErrorMax) {
    //       this.infoContainerContent?.onInit?.();
    //     }
    //   },
    // );
  };

  onConfirm = () => {
    const {
      sessionToken,
      route: { params },
    } = this.props;
    const { code } = this.state;

    this.props.authenticate(sessionToken, code, {
      onFailure: this.onError,
      onSuccess: this.infoContainerContent.onCodeConfirm || params.onSuccess,
    });
  };

  setCode = (code: string) => {
    this.setState({ code });
  };

  onChange = (code: string) => {
    const { setError, notificationError } = this.props;

    !!notificationError && setError('');
    this.setCode(code);
  };

  onResend = () => {
    const { setError } = this.props;

    this.setCode('');
    setError('');
    this.infoContainerContent.onInit?.();
  };

  render() {
    const { notificationError } = this.props;
    const { email, onBack, title, description } = this.props.route.params;

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
            <TimeoutButton
              testID="resend-code-email"
              containerStyle={styles.resendButton}
              title={i18n.notifications.resend}
              onPress={this.onResend}
            />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{this.infoContainerContent.title || title}</Text>
          <Text style={styles.infoDescription}>
            {this.infoContainerContent.description || description}
            <Text style={styles.email}>{`\n${email}`}</Text>
          </Text>
        </View>
        <View style={styles.inputItemContainer}>
          <CodeInput value={this.state.code} onTextChange={this.onChange} isError={!!notificationError} />
          {!!notificationError && <Text style={styles.error}>{notificationError}</Text>}
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  sessionToken: sessionToken(state),
  notificationError: readableError(state),
  storedEmail: storedEmail(state),
  failedTries: failedTries(state),
});

const mapDispatchToProps = {
  createNotificationEmail,
  subscribe: subscribeWallet,
  unsubscribe: unsubscribeWallet,
  authenticate: authenticateEmail,
  setError: setErrorAction,
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
