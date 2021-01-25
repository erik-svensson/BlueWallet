import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { CodeInput, Header, ScreenTemplate, Button, TimeoutButton } from 'app/components';
import { Route, CONST, RootStackParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors as notificationSelectors } from 'app/state/notifications';
import { setNotificationEmail as setNotificationEmailAction } from 'app/state/notifications/actions';
import { palette, typography } from 'app/styles';

import { messages } from '../../error';

const i18n = require('../../loc');

type State = {
  userCode: string;
  numberAttempt: number;
  localError: string;
};

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  route: RouteProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  pin: string;
  error: string;
  email: string;
  setNotificationEmail: Function;
}

class LocalConfirmNotificationCodeScreen extends PureComponent<Props, State> {
  state = {
    userCode: '',
    numberAttempt: 0,
    localError: '',
  };

  setCode = (userCode: string) => {
    this.setState({ userCode });
  };

  resendCode = () => {
    const { setNotificationEmail } = this.props;
    const { email } = this.props.route.params;

    setNotificationEmail(email, {
      onSuccess: () => {
        this.setState({
          localError: '',
          userCode: '',
          numberAttempt: 0,
        });
      },
    });
  };

  onError = () => {
    const { numberAttempt } = this.state;
    const numberFail = numberAttempt + 1;
    if (numberFail === CONST.emailCodeErrorMax) {
      this.setState({
        localError: i18n.onboarding.resendCodeError,
        numberAttempt: numberFail,
      });
    } else {
      this.setState({
        numberAttempt: numberFail,
        localError: i18n.formatString(i18n.onboarding.validationCodeError, {
          numberAttempt: CONST.emailCodeErrorMax - numberFail,
        }),
        userCode: '',
      });
    }
  };

  onConfirm = () => {
    const { pin } = this.props;
    const { onSuccess } = this.props.route.params;

    const { userCode } = this.state;

    const passedCode = pin === userCode;

    if (passedCode) {
      onSuccess();
    } else {
      this.onError();
    }
  };

  get error() {
    const { error } = this.props;
    const { localError } = this.state;

    const err = error || localError;
    if (err.startsWith(messages.requestFailed5XX)) {
      return i18n.connectionIssue.couldntConnectToServer;
    }
    return err;
  }

  render() {
    const { userCode, numberAttempt } = this.state;
    const { children, title } = this.props.route.params;
    const allowConfirm = numberAttempt < CONST.emailCodeErrorMax;

    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow title={title} />}
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n._.confirm}
              testID="confirm-code-email"
              onPress={this.onConfirm}
              disabled={allowConfirm && userCode.length < CONST.codeLength}
            />
            <TimeoutButton
              testID="resend-code-email"
              containerStyle={styles.resendButton}
              title={i18n.notifications.resendCode}
              timeoutSeconds={30}
              onPress={this.resendCode}
            />
          </>
        }
      >
        {children}
        <View style={styles.codeContainer}>
          <CodeInput value={this.state.userCode} testID="confirm-code" onTextChange={this.setCode} />
          <Text testID="invalid-code-message" style={styles.errorText}>
            {this.error}
          </Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  pin: notificationSelectors.pin(state),
  error: notificationSelectors.error(state),
});

const mapDispatchToProps = {
  setNotificationEmail: setNotificationEmailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalConfirmNotificationCodeScreen);

const styles = StyleSheet.create({
  codeContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  errorText: {
    marginVertical: 10,
    textAlign: 'center',
    color: palette.textRed,
    ...typography.headline6,
  },
  resendButton: {
    marginTop: 12,
  },
});
