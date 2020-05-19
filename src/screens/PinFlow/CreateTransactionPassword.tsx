import React, { PureComponent } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProps, NavigationEvents, NavigationInjectedProps } from 'react-navigation';

import { Header, InputItem } from 'app/components';
import { Route, CONST } from 'app/consts';
import { typography } from 'app/styles';

const i18n = require('../../../loc');

interface Props extends NavigationInjectedProps {
  appSettings: {
    isPinSet: boolean;
  };
}

interface State {
  password: string;
  focused: boolean;
}

export class CreateTransactionPassword extends PureComponent<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} title={i18n.onboarding.createPassword} />,
  });

  state = {
    password: '',
    focused: false,
  };

  inputRef: any = React.createRef();

  updatePassword = (password: string) => {
    this.setState({ password }, () => {
      if (this.state.password.length === CONST.transactionPasswordLength) {
        this.props.navigation.navigate(Route.ConfirmTransactionPassword, {
          password: this.state.password,
        });
        this.setState({ password: '' });
      }
    });
  };

  openKeyboard = () => {
    if (this.inputRef.current) {
      this.inputRef.current.inputItemRef.current.focus();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <NavigationEvents onDidFocus={this.openKeyboard} />
        <Text style={typography.headline4}>{i18n.onboarding.createPassword}</Text>
        <InputItem label="password" value={this.state.password} setValue={this.updatePassword} ref={this.inputRef} />
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
});
