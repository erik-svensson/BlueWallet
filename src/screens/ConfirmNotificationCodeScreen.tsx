import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { CodeInput, Header, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, CONST, RootStackParams } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { ApplicationState } from 'app/state';
import { selectors as notificationSelectors } from 'app/state/notifications';
import { createNotificationEmail as createNotificationEmailAction } from 'app/state/notifications/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type State = {
  userCode: string;
  numberAttempt: number;
  error: string;
};

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ConfirmNotificationCode>;
  createNotificationEmail: Function;
  route: RouteProp<RootStackParams, Route.ConfirmNotificationCode>;
  email: string;
  pin: string;
}

class ConfirmNotificationCodeScreen extends PureComponent<Props, State> {
  state = {
    userCode: '',
    numberAttempt: 0,
    error: '',
  };

  componentDidMount() {
    this.setState({
      error: '',
    });
  }

  checkCode = (userCode: string) => {
    this.setState({ userCode });
  };

  resendCode = () => {
    this.setState({
      error: '',
      userCode: '',
      numberAttempt: 0,
    });
  };

  onSuccess = () => {
    const { navigation } = this.props;

    CreateMessage({
      title: i18n.contactCreate.successTitle,
      description: i18n.onboarding.successCompletedDescription,
      type: MessageType.success,
      buttonProps: {
        title: i18n.onboarding.successCompletedButton,
        onPress: () => {
          navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
        },
      },
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
    const { pin, createNotificationEmail, email } = this.props;

    const { userCode } = this.state;

    const passedCode = pin === userCode;

    if (passedCode) {
      createNotificationEmail(email, {
        onSuccess: this.onSuccess,
      });
    } else {
      this.onError();
    }
  };

  render() {
    const { error, userCode, numberAttempt } = this.state;
    const { email } = this.props.route.params;
    const allowReSend = numberAttempt < CONST.emailCodeErrorMax;

    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow title={i18n.onboarding.onboarding} />}
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n.onboarding.confirmNotification}
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
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.confirmEmail}</Text>
          <Text style={styles.codeDescription}>{i18n.onboarding.confirmEmailDescription}</Text>
          <Text style={typography.headline5}>{email}</Text>
        </View>
        <View style={styles.codeContainer}>
          <CodeInput value={this.state.userCode} testID="confirm-code" onTextChange={this.checkCode} />
          <Text testID="invalid-code-message" style={styles.errorText}>
            {error}
          </Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps = {
  createNotificationEmail: createNotificationEmailAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  pin: notificationSelectors.pin(state),
  email: notificationSelectors.storedEmail(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNotificationCodeScreen);

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
