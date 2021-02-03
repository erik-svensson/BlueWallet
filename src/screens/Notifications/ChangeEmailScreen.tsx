import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, InputItem } from 'app/components';
import { Route, RootStackParams, ConfirmAddressFlowType } from 'app/consts';
import { isEmail } from 'app/helpers/helpers';
import { ApplicationState } from 'app/state';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ChangeEmail>;
  email: string;
}

interface State {
  email: string;
  error: string;
}

class ChangeEmailScreen extends Component<Props, State> {
  state = {
    email: '',
    error: '',
  };

  onConfirm = () => {
    if (!isEmail(this.state.email)) {
      return this.setState({
        error: i18n.notifications.invalidAddressError,
      });
    }
    return this.props.navigation.navigate(Route.ConfirmEmail, {
      email: this.props.email,
      newAddress: this.state.email,
      flowType: ConfirmAddressFlowType.CURRENT_ADDRESS,
      // TODO: flow in progress
      onSuccess: () => {},
    });
  };

  onChange = (email: string) => this.setState({ email, error: '' });

  render() {
    const { email } = this.state;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow title={i18n.settings.notifications} />}
        footer={<Button title={i18n._.confirm} onPress={this.onConfirm} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.changeEmailTitle}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.changeEmailDescription}</Text>
        </View>
        <View style={styles.amountAddress}>
          <Text style={styles.inputLabel}>{i18n.notifications.yourCurrentEmail}</Text>
          <Text style={styles.email}>{this.props.email}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem
            value={email}
            setValue={this.onChange}
            autoFocus
            label={i18n.notifications.newEmail}
            error={this.state.error}
          />
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  email: state.notifications.email,
});

export default connect(mapStateToProps)(ChangeEmailScreen);

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  infoDescription: {
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
  amountAddress: { width: '100%', borderBottomColor: palette.grey, borderBottomWidth: 1, paddingBottom: 10 },
  email: { ...typography.caption, color: palette.textBlack },
  inputLabel: {
    ...typography.overline,
    color: palette.textGrey,
    marginBottom: 4,
  },
});
