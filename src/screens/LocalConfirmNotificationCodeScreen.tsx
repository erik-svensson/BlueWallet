import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { CodeInput, Header, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, CONST, RootStackParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors as notificationSelectors } from 'app/state/notifications';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type State = {
  userCode: string;
  numberAttempt: number;
  error: string;
};

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  route: RouteProp<RootStackParams, Route.LocalConfirmNotificationCode>;
  pin: string;
}

class LocalConfirmNotificationCodeScreen extends PureComponent<Props, State> {
  state = {
    userCode: '',
    numberAttempt: 0,
    error: '',
  };

  setCode = (userCode: string) => {
    this.setState({ userCode });
  };

  resendCode = () => {
    this.setState({
      error: '',
      userCode: '',
      numberAttempt: 0,
    });
  };

  onError = () => {
    const { numberAttempt } = this.state;
    const numberFail = numberAttempt + 1;
    if (numberFail === CONST.emailCodeErrorMax) {
      this.setState({
        error: i18n.onboarding.resendCodeError,
        numberAttempt: numberFail,
      });
    } else {
      this.setState({
        numberAttempt: numberFail,
        error: i18n.formatString(i18n.onboarding.validationCodeError, {
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

  render() {
    const { error, userCode, numberAttempt } = this.state;
    const { children, title } = this.props.route.params;
    const allowReSend = numberAttempt < CONST.emailCodeErrorMax;

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
              disabled={userCode.length < CONST.codeLength}
            />
            {/* <FlatButton // TODO uncomment when api for resend works
              testID="resend-code-email"
              containerStyle={styles.resendButton}
              title={i18n._.resendCode}
              disabled={allowReSend}
              onPress={this.resendCode}
            /> */}
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
});

export default connect(mapStateToProps)(LocalConfirmNotificationCodeScreen);

const styles = StyleSheet.create({
  codeContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  infoContainer: {
    alignItems: 'center',
  },
  codeDescription: {
    ...typography.caption,
    color: palette.textGrey,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
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
