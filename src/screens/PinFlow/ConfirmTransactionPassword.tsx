import React, { PureComponent } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProps, NavigationInjectedProps } from 'react-navigation';

import { Header, InputItem } from 'app/components';
import { Route, CONST } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { SecureStorageService } from 'app/services';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

type Props = NavigationInjectedProps;

type State = {
  password: string;
  error: string;
  flowType: string;
};

export class ConfirmTransactionPassword extends PureComponent<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title="Confirm transaction password" />,
  });

  state = {
    password: '',
    error: '',
  };

  inputRef: any = React.createRef();

  componentDidMount() {
    this.openKeyboard();
  }

  updatePassword = (password: string) => {
    this.setState({ password }, async () => {
      if (this.state.password.length === CONST.transactionPasswordLength) {
        const setPassword = this.props.navigation.getParam('password');
        if (setPassword === this.state.password) {
          await SecureStorageService.setSecuredValue('transactionPassword', this.state.password);
          CreateMessage({
            title: i18n.contactCreate.successTitle,
            description: i18n.onboarding.successDescription,
            type: MessageType.success,
            buttonProps: {
              title: i18n.onboarding.successButton,
              onPress: () => {
                this.props.navigation.navigate(Route.Dashboard);
              },
            },
          });
        } else {
          this.setState({
            error: i18n.onboarding.pinDoesNotMatch,
            password: '',
          });
        }
      }
    });
  };

  openKeyboard = () => {
    if (this.inputRef.current) {
      this.inputRef.current.inputItemRef.current.focus();
    }
  };

  render() {
    const { error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Text style={typography.headline4}>Confirm transaction password</Text>
        <InputItem
          label="password"
          value={this.state.password}
          setValue={this.updatePassword}
          ref={this.inputRef}
          error={error}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    alignItems: 'center',
  },
  errorText: {
    marginVertical: 30,
    color: palette.textRed,
    ...typography.headline6,
  },
});
