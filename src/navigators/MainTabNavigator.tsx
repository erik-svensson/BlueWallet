import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import { images } from 'app/assets';
// import { BottomTabBarIcon, BottomTabBarComponent } from 'app/components';
import { Route } from 'app/consts';
import { ContactListScreen, DashboardScreen, SettingsScreen } from 'app/screens';
import { palette } from 'app/styles';

const HomeScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />;
// const DetailsScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />;

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name={Route.ContactList} component={ContactListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
