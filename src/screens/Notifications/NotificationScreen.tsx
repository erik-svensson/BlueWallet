import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { images } from 'app/assets';
import { Header, ScreenTemplate, Image, EllipsisText } from 'app/components';
import { Route, RootStackParams, Wallet } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.Notifications>;
  route: RouteProp<RootStackParams, Route.Notifications>;
  wallets: Wallet[];
}
export class NotificationScreen extends Component<Props> {
  render() {
    const {
      navigation,
      route: {
        params: { onBackArrow },
      },
    } = this.props;

    return (
      <ScreenTemplate
        header={<Header isBackArrow={true} onBackArrow={onBackArrow} title={i18n.notifications.main.header} />}
        noScroll
        contentContainer={styles.screenTemplate}
      >
        <Text style={styles.title}>{i18n.notifications.main.title}</Text>
        <Text style={styles.description}>{i18n.notifications.main.description}</Text>
        <View style={styles.container}>
          <View style={styles.greyLine}></View>
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() =>
              navigation.navigate(Route.NotificationsEmail, {
                wallet: {} as Wallet,
                onBackArrow: () =>
                  navigation.navigate(Route.Notifications, {
                    wallet: {} as Wallet,
                    onBackArrow: () => navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Settings }),
                  }),
              })
            }
          >
            <View style={styles.row}>
              <EllipsisText style={styles.itemName}>{i18n.notifications.emailNotificationsNavigate}</EllipsisText>
              <Image source={images.backArrow} style={styles.arrow} resizeMode="contain" />
            </View>
          </TouchableOpacity>
          <View style={styles.greyLine}></View>

          <TouchableOpacity
            style={styles.itemRow}
            onPress={() =>
              navigation.navigate(Route.NotificationsPush, {
                wallet: {} as Wallet,
                onBackArrow: () =>
                  navigation.navigate(Route.Notifications, {
                    wallet: {} as Wallet,
                    onBackArrow: () => navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Settings }),
                  }),
              })
            }
          >
            <View style={styles.row}>
              <EllipsisText style={styles.itemName}>{i18n.notifications.pushNotificationsNavigate}</EllipsisText>
              <Image source={images.backArrow} style={styles.arrow} resizeMode="contain" />
            </View>
          </TouchableOpacity>
          <View style={styles.greyLine}></View>
        </View>
      </ScreenTemplate>
    );
  }
}

export default NotificationScreen;

const styles = StyleSheet.create({
  title: {
    ...typography.headline4,
    alignSelf: 'center',
    marginVertical: 18,
    marginTop: 40,
  },
  screenTemplate: { flex: 1 },
  description: {
    ...typography.caption,
    color: palette.textGrey,
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  itemName: { ...typography.subtitle6, paddingRight: 40 },
  arrow: {
    width: 8,
    height: 13,
    transform: [{ rotate: '180deg' }],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  itemRow: {
    marginVertical: 8,
  },
  container: {
    paddingTop: 40,
  },
  greyLine: {
    marginVertical: 24,
    borderColor: palette.grey,
    width: '120%',
    borderWidth: StyleSheet.hairlineWidth,
    left: -20,
  },
});
