import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { Header, ScreenTemplate, Button } from 'app/components';
import { MainCardStackNavigatorParams, MainTabNavigatorParams, Route } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<MainCardStackNavigatorParams, Route.ReceiveNotificationsConfirmation>,
    CompositeNavigationProp<
      StackNavigationProp<MainTabNavigatorParams, Route.Dashboard>,
      StackNavigationProp<MainCardStackNavigatorParams, Route.ReceiveNotificationsConfirmation>
    >
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.ReceiveNotificationsConfirmation>;
}

export const ReceiveNotificationsConfirmationScreen = (props: Props) => {
  const handleNoPress = () => props.navigation.navigate(Route.Dashboard);
  const handleYesPress = () => {
    const {
      route: {
        params: { flowType, address },
      },
      navigation,
    } = props;
    navigation.navigate(Route.ConfirmEmail, {
      address,
      flowType,
    });
  };

  return (
    <ScreenTemplate
      footer={
        <View style={styles.buttonContainer}>
          <Button
            title={i18n.notifications.no}
            onPress={handleNoPress}
            type="outline"
            containerStyle={styles.noButton}
          />
          <Button title={i18n.notifications.yes} onPress={handleYesPress} containerStyle={styles.yesButton} />
        </View>
      }
      header={<Header title={i18n.notifications.notifications} />}
    >
      <Text style={styles.title}>{i18n.notifications.getNotification}</Text>
      <Text style={styles.description}>
        {i18n.notifications.receiveTransactionDescription}
        <Text style={styles.boldedText}>{props.route.params.address}</Text>
      </Text>
      <Text style={[styles.description, styles.note]}>
        <Text style={styles.boldedText}>{i18n.notifications.noteFirst}</Text>
        {i18n.notifications.noteSecond}
      </Text>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  title: { ...typography.headline4, marginTop: 20, textAlign: 'center' },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 18,
  },
  note: {
    marginTop: 42,
  },
  boldedText: {
    ...typography.headline9,
    color: palette.textBlack,
  },
  buttonContainer: { flexDirection: 'row', width: '50%', marginBottom: 20 },
  noButton: { paddingRight: 10, width: '100%' },
  yesButton: { paddingLeft: 10, width: '100%' },
});
