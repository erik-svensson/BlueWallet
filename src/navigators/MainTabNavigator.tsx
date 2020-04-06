import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import MainBottomTabs from '../../MainBottomTabs';
import { AddressBookNavigator } from './AddressBookNavigator';
import { BottomTabBarIcon } from 'components';
import { images } from 'assets';
import { palette } from 'style';

export const MainTabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: MainBottomTabs,
      navigationOptions: {
        title: 'Dashboard',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <BottomTabBarIcon source={focused ? images.dashboard : images.dashboardInactive} />
        ),
      },
    },
    AddressBook: {
      screen: AddressBookNavigator,
      navigationOptions: {
        title: 'Address book',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <BottomTabBarIcon source={focused ? images.addressBook : images.addressBookInactive} />
        ),
      },
    },
    Settings: {
      screen: AddressBookNavigator,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <BottomTabBarIcon source={focused ? images.settings : images.settingsInactive} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: palette.textWhite,
      inactiveTintColor: palette.textWhiteDisabled,
      labelStyle: tabStyle.label,
    },
  },
);
