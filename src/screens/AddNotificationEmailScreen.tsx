import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Header, InputItem, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, RootStackParams } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import {
  createNotificationEmail as createNotificationEmailAction,
  setNotificationEmail as setNotificationEmailAction,
} from 'app/state/notifications/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.AddNotificationEmail>;
  createNotificationEmail: Function;
  setNotificationEmail: Function;
  hasWallets: boolean;
}

type State = {
  email: string;
  error: string;
};

class AddNotificationEmailScreen extends PureComponent<Props, State> {
  state = {
    email: '',
    error: '',
  };

  setEmail = (email: string): void => {
    this.setState({
      email,
    });
  };

  onSave = () => {
    const { email } = this.state;
    const { setNotificationEmail, navigation, hasWallets } = this.props;
    if (!isEmail(email)) {
      return this.setState({
        error: i18n.onboarding.emailValidation,
      });
    }
    if (!hasWallets) {
      setNotificationEmail(email, {
        onSuccess: () => navigation.navigate(Route.ConfirmNotificationCode, { email }),
      });
    } else {
      navigation.navigate(Route.ChooseWalletsForNotification, { email, isOnboarding: true });
    }
  };

  skipAddEmail = () => {
    const { createNotificationEmail, navigation } = this.props;
    createNotificationEmail('', {
      onSuccess: () => {
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
      },
    });
  };

  render() {
    const { email, error } = this.state;
    return (
      <ScreenTemplate
        noScroll
        keyboardShouldPersistTaps="always"
        footer={
          <>
            <Button
              title={i18n.onboarding.confirmNotification}
              testID="submit-notification-email"
              onPress={this.onSave}
              disabled={email.length === 0}
            />
            <FlatButton
              testID="skip-notification-email"
              containerStyle={styles.skipButton}
              title={i18n._.skipStep}
              onPress={this.skipAddEmail}
            />
          </>
        }
        header={<Header title={i18n.onboarding.onboarding} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.onboarding.notification}</Text>
          <Text style={styles.pinDescription}>{i18n.onboarding.addNotificationEmailDescription}</Text>
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
          />
        </View>
      </ScreenTemplate>
    );
  }
}

const mapDispatchToProps = {
  createNotificationEmail: createNotificationEmailAction,
  setNotificationEmail: setNotificationEmailAction,
};

const mapStateToProps = (state: ApplicationState) => ({
  hasWallets: walletsSelectors.hasWallets(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNotificationEmailScreen);

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
  skipButton: {
    marginTop: 12,
  },
});
