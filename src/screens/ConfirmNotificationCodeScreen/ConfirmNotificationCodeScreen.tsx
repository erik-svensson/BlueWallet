import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { CodeInput, Header, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, PasswordNavigatorParams, CONST } from 'app/consts';
import { createTc as createTcAction } from 'app/state/authentication/actions';
import { createNotificationEmail as createNotificationEmailAction } from 'app/state/notifications/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

type State = {
  code: string;
  error: string;
};

interface Props {
  navigation: StackNavigationProp<PasswordNavigatorParams, Route.ConfirmNotificationCode>;
  createNotificationEmail: Function;
  route: RouteProp<PasswordNavigatorParams, Route.ConfirmNotificationCode>;
  createTc: () => void;
}

class ConfirmNotificationCodeScreen extends PureComponent<Props, State> {
  state = {
    code: '',
    error: '',
  };

  componentDidMount() {
    this.setState({
      error: '',
    });
  }

  checkCode = (code: string) => {
    this.setState({ code });
  };

  resendCode = () => {};

  onSave = () => {
    //TODO: during mockup test simple skip to dashboard
    const { createTc, createNotificationEmail, navigation } = this.props;
    createTc();
    createNotificationEmail('', {
      onSuccess: () => {
        navigation.navigate(Route.Message, {
          title: i18n.contactCreate.successTitle,
          description: i18n.onboarding.successCompletedDescription,
          source: images.success,
          buttonProps: {
            title: i18n.onboarding.successCompletedButton,
            onPress: () => {
              navigation.pop();
            },
          },
        });
      },
    });
  };

  render() {
    const { error, code } = this.state;
    const { email } = this.props.route.params;

    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow title={i18n.onboarding.onboarding} />}
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n.onboarding.confirmNotification}
              testID="submit-code-email"
              onPress={this.onSave}
              disabled={code.length < CONST.codeLength}
            />
            <FlatButton
              testID="resend-code-email"
              containerStyle={styles.resendButton}
              title={i18n._.resendCode}
              onPress={this.resendCode}
            />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.confirmEmail}</Text>
          <Text style={styles.codeDescription}>{`${i18n.onboarding.confirmEmailDescription} ${email}`}</Text>
        </View>
        <View style={styles.codeContainer}>
          <CodeInput value={this.state.code} testID="confirm-code" onTextChange={this.checkCode} />
          <Text testID="invalid-code-message" style={styles.errorText}>
            {error}
          </Text>
        </View>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps = {
  createTc: createTcAction,
  createNotificationEmail: createNotificationEmailAction,
};

export default connect(null, mapDispatchToProps)(ConfirmNotificationCodeScreen);

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
    margin: 20,
    textAlign: 'center',
  },
  errorText: {
    marginVertical: 10,
    color: palette.textRed,
    ...typography.headline6,
  },
  resendButton: {
    marginTop: 12,
  },
});
