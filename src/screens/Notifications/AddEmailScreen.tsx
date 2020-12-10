import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header, ScreenTemplate, Button, InputItem } from 'app/components';
import { Route, MainCardStackNavigatorParams, RootStackParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.MainCardStackNavigator>,
    StackNavigationProp<MainCardStackNavigatorParams, Route.AddEmail>
  >;
}

interface State {
  address: string;
}

export class AddEmailScreen extends Component<Props, State> {
  state = {
    address: '',
  };
  onConfirm = () => {
    this.props.navigation.navigate(Route.ConfirmEmail, { address: this.state.address });
  };

  onChange = (address: string) => this.setState({ address });

  render() {
    const { address } = this.state;
    return (
      <ScreenTemplate
        noScroll
        header={<Header isBackArrow={true} title={i18n.settings.notifications} />}
        footer={<Button title={i18n._.confirm} onPress={this.onConfirm} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.addYourEmailFor}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.addYourEmailForDescription}</Text>
        </View>
        <View style={styles.inputItemContainer}>
          <InputItem value={address} setValue={this.onChange} autoFocus label={i18n.notifications.yourEmail} />
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
    width: '100%',
    height: 100,
  },
});
