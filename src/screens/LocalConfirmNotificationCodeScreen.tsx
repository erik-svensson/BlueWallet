import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { CodeInput, Header, ScreenTemplate, Button, TimeoutButton } from 'app/components';
import { Route, CONST, RootStackParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors as notificationSelectors } from 'app/state/notifications';
import {
  verifyNotificationEmail as verifyNotificationEmailAction,
  VerifyNotificationEmailActionFunction,
  SetErrorActionFunction,
  setError as setErrorAction,
} from 'app/state/notifications/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type State = {
  userCode: string;
  numberAttempt: number;
};

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  route: RouteProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  pin: string;
  error: string;
  email: string;
  setError: SetErrorActionFunction;
  verifyNotificationEmail: VerifyNotificationEmailActionFunction;
}

class LocalConfirmNotificationCodeScreen extends PureComponent<Props, State> {
  state = {
    userCode: '',
    numberAttempt: 0,
  };

  componentWillUnmount() {
    this.props.setError('');
  }

  setCode = (userCode: string) => {
    this.setState({ userCode });
  };

  resendCode = (error = '') => {
    const { verifyNotificationEmail, setError } = this.props;
    const { email } = this.props.route.params;

    verifyNotificationEmail(email, {
      onSuccess: () => {
        setError(error);
        this.setState({
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
      this.resendCode(i18n.onboarding.resendCodeError);
    } else {
      this.props.setError(
        i18n.formatString(i18n.onboarding.validationCodeError, {
          numberAttempt: CONST.emailCodeErrorMax - numberFail,
        }),
      );
      this.setState({
        numberAttempt: numberFail,
        userCode: '',
      });
    }
  };

  onConfirm = () => {
    const {
      pin,
      route: {
        params: { onSuccess },
      },
    } = this.props;
    const { userCode } = this.state;

    if (pin === userCode) {
      onSuccess();
    } else {
      this.onError();
    }
  };

  render() {
    const { userCode, numberAttempt } = this.state;
    const { error } = this.props;
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
              title={i18n.notifications.resend}
              timeoutSeconds={30}
              onPress={() => this.resendCode()}
            />
          </>
        }
      >
        {children}
        <View style={styles.codeContainer}>
          <CodeInput value={this.state.userCode} testID="confirm-code" onTextChange={this.setCode} />
          <Text testID="invalid-code-message" style={styles.errorText}>
            {error}
          </Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  pin: notificationSelectors.pin(state),
  error: notificationSelectors.readableError(state),
});

const mapDispatchToProps = {
  verifyNotificationEmail: verifyNotificationEmailAction,
  setError: setErrorAction,
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
