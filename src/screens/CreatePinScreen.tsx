import React, { PureComponent } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProps, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, PinInput } from 'app/components';
import { Route } from 'app/consts';
import { ApplicationState } from 'app/state';
import { typography } from 'app/styles';

const i18n = require('../../loc');

class CreatePinScreen extends PureComponent {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} title={i18n.onboarding.pin} />,
  });
  state = {
    pin: '',
    focused: false,
  };
  pinInputRef = null;
  updatePin = pin => {
    this.setState({ pin }, async () => {
      if (this.state.pin.length === 4) {
        if (!this.props.appSettings.isPinSet) {
          this.props.navigation.navigate(Route.ConfirmPin, {
            pin: this.state.pin,
          });
          this.setState({
            pin: '',
          });
        }
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
        <Text style={typography.headline4}>{i18n.onboarding.createPin}</Text>
        <PinInput
          value={this.state.pin}
          onTextChange={pin => this.updatePin(pin)}
          ref={ref => (this.pinInputRef = ref)}
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
});

const mapStateToProps = (state: ApplicationState) => ({
  appSettings: state.appSettings,
});

export default connect(mapStateToProps)(CreatePinScreen);
