import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, ScreenTemplate, Button, FlatButton, CodeInput } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.ConfirmEmail>
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.ConfirmEmail>;
}

interface State {
  code: string;
}

export class ConfirmEmailScreen extends Component<Props, State> {
  state = {
    code: '',
  };

  onConfirm = () => {};

  onChange = (code: string) => this.setState({ code });

  onResend = () => {};

  render() {
    const { address } = this.props.route.params;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={
          <>
            <Button title={i18n._.confirm} onPress={this.onConfirm} />
            <FlatButton
              containerStyle={styles.resendButton}
              title={i18n.notifications.resend}
              onPress={this.onResend}
            />
          </>
        }
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.confirmEmail}</Text>
          <Text style={styles.infoDescription}>
            {i18n.notifications.pleaseEnter}
            <Text style={styles.address}>{`\n${address}`}</Text>
          </Text>
        </View>
        <View style={styles.inputItemContainer}>
          <CodeInput value={this.state.code} onTextChange={this.onChange} />
        </View>
      </ScreenTemplate>
    );
  }
}

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
    height: 100,
    marginHorizontal: 25,
  },
  resendButton: {
    marginTop: 12,
  },
  address: {
    ...typography.subtitle6,
    color: palette.textBlack,
  },
});
