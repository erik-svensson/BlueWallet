import React, { PureComponent } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, BackHandler } from 'react-native';
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
  pin: string;
  focused: boolean;
  flowType: string;
}

export class CreateTransactionPassword extends PureComponent<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: (
      <Header
        navigation={props.navigation}
        title={props.navigation.getParam('flowType') === 'newPin' ? i18n.onboarding.changePin : i18n.onboarding.pin}
      />
    ),
  });

  state = {
    pin: '',
    focused: false,
    flowType: '',
  };

  pinInputRef: any = React.createRef();
  backHandler: any;

  componentDidMount() {
    this.setState({
      flowType: this.props.navigation.getParam('flowType'),
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  backAction = () => {
    return this.state.flowType === 'newPin' && this.props.navigation.navigate(Route.Settings);
  };

  updatePin = (pin: string) => {
    this.setState({ pin }, async () => {
      if (this.state.pin.length === CONST.pinCodeLength) {
        this.props.navigation.navigate(Route.ConfirmPin, {
          flowType: this.state.flowType,
          pin: this.state.pin,
        });
        this.setState({
          pin: '',
        });
      }
    });
  };

  openKeyboard = () => {
    if (this.pinInputRef.pinCodeRef) {
      this.pinInputRef.pinCodeRef.current.inputRef.current.focus();
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <NavigationEvents onDidFocus={this.openKeyboard} />
        <Text style={typography.headline4}>Create transaction password</Text>
        <InputItem label="password" value={this.state.pin} setValue={this.updatePin} ref={this.pinInputRef} />
        {/* <PinInput value={this.state.pin} onTextChange={this.updatePin} ref={this.pinInputRef} /> */}
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
