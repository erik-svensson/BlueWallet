import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PureComponent } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { images } from 'app/assets';
import { Header, InputItem, ScreenTemplate, Button, FlatButton } from 'app/components';
import { Route, PasswordNavigatorParams, RootStackParams } from 'app/consts';
import { createTc as createTcAction } from 'app/state/authentication/actions';
import { createNotificationEmail as createNotificationEmailAction } from 'app/state/notifications/actions';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<PasswordNavigatorParams, Route.AddNotificationEmail>
  >;
  route: RouteProp<PasswordNavigatorParams, Route.AddNotificationEmail>;
  createTc: () => void;
  createNotificationEmail: Function;
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
    // TODO: validation email
    //TODO: pass email and connect with api
    this.props.navigation.navigate(Route.ConfirmNotificationCode, { email });
  };

  skipAddEmail = () => {
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
              navigation.navigate(Route.MainCardStackNavigator);
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
  createTc: createTcAction,
  createNotificationEmail: createNotificationEmailAction,
};

export default connect(null, mapDispatchToProps)(AddNotificationEmailScreen);

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
