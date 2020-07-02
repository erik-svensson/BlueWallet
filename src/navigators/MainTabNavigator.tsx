import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import { images } from 'app/assets';
import { BottomTabBarIcon, BottomTabBarComponent } from 'app/components';
import { Route } from 'app/consts';
import { ContactListScreen, DashboardScreen, SettingsScreen } from 'app/screens';
import { palette } from 'app/styles';

const i18n = require('../../loc');

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      // headerMode="none"
      tabBar={props => <BottomTabBarComponent {...props} />}
      tabBarOptions={{
        // @ts-ignore
        keyboardHidesTabBar: true,
        activeTintColor: palette.secondary,
        inactiveTintColor: palette.textWhiteMuted,
      }}
    >
      <Tab.Screen
        name={Route.Dashboard}
        component={DashboardScreen}
        options={() => ({
          tabBarLabel: i18n.tabNavigator.dashboard,
        })}
      />
      <Tab.Screen
        name={Route.ContactList}
        component={ContactListScreen}
        options={() => ({
          tabBarLabel: i18n.tabNavigator.addressBook,
        })}
      />
      <Tab.Screen
        name={Route.Settings}
        component={SettingsScreen}
        options={() => ({
          tabBarLabel: i18n.tabNavigator.settings,
        })}
      />
    </Tab.Navigator>
  );
};

// export const MainTabNavigator = createBottomTabNavigator(
//   {
//     [Route.Dashboard]: {
//       screen: DashboardScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }: { focused: boolean }) => (
//           <BottomTabBarIcon source={focused ? images.dashboard : images.dashboardInactive} />
//         ),
//       },
//     },
//     [Route.ContactList]: {
//       screen: ContactListScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }: { focused: boolean }) => (
//           <BottomTabBarIcon source={focused ? images.addressBook : images.addressBookInactive} />
//         ),
//       },
//     },
//     [Route.Settings]: {
//       screen: SettingsScreen,
//       navigationOptions: {
//         tabBarIcon: ({ focused }: { focused: boolean }) => (
//           <BottomTabBarIcon source={focused ? images.settings : images.settingsInactive} />
//         ),
//       },
//     },
//   },
//   {
//     tabBarComponent: props => <BottomTabBarComponent {...props} />,
//     tabBarOptions: {
//       // @ts-ignore
//       keyboardHidesTabBar: true,
//       activeTintColor: palette.secondary,
//       inactiveTintColor: palette.textWhiteMuted,
//     },
//   },
// );
