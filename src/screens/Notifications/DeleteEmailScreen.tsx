import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button, Header, ScreenTemplate } from 'app/components';
import { Route, RootStackParams, MainCardStackNavigatorParams, ConfirmAddressFlowType } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParams, Route.DeleteEmail>,
    CompositeNavigationProp<
      StackNavigationProp<MainCardStackNavigatorParams, Route.Notifications>,
      StackNavigationProp<RootStackParams, Route.DeleteEmail>
    >
  >;
  route: RouteProp<RootStackParams, Route.DeleteEmail>;
}

export class DeleteEmailScreen extends React.PureComponent<Props> {
  navigateBack = () => this.props.navigation.goBack();

  goToSuccessScreen = () =>
    CreateMessage({
      title: i18n.message.success,
      description: i18n.notifications.deleteEmailSuccessMessage,
      type: MessageType.success,
      buttonProps: {
        title: i18n.notifications.goToNotifications,
        onPress: () => this.props.navigation.navigate(Route.Notifications),
      },
    });

  goToConfirmScreen = () =>
    this.props.navigation.navigate(Route.ConfirmEmail, {
      address: this.props.route.params.address,
      flowType: ConfirmAddressFlowType.DELETE_ADDRESS,
    });

  deleteEmail = () => {
    this.props.route.params.hasWallets ? this.goToConfirmScreen() : this.goToSuccessScreen();
  };

  render() {
    return (
      <ScreenTemplate
        footer={
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.contactDelete.no}
              onPress={this.navigateBack}
              type="outline"
              containerStyle={styles.noButton}
            />
            <Button title={i18n.contactDelete.yes} onPress={this.deleteEmail} containerStyle={styles.yesButton} />
          </View>
        }
        header={<Header title={i18n.notifications.deleteEmail} />}
      >
        <View style={styles.infoContainer}>
          <Text style={typography.headline4}>{i18n.notifications.deleteYourEmail}</Text>
          <Text style={styles.infoDescription}>{i18n.notifications.deleteYourEmailDescription}</Text>
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
  buttonContainer: { flexDirection: 'row', width: '50%' },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
