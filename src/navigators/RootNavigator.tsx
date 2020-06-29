import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Easing, Animated, View } from 'react-native';

import { Route } from 'app/consts';
import { ActionSheet, ImportWalletQRCodeScreen } from 'app/screens';

import { EditTextNavigator } from './EditTextNavigator';
import { MainCardStackNavigator } from './MainCardStackNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { MessageNavigator } from './MessageNavigator';
import { PasswordNavigator } from './PasswordNavigator';
import { UnlockTransactionNavaigator } from './UnlockTransactionNavaigator';

const Stack = createStackNavigator();

// const HomeScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />;
// const DetailsScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />;

export const RootNavigator = () => (
  <NavigationContainer>
    <MainCardStackNavigator />
  </NavigationContainer>
);

// export const RootNavigator = createStackNavigator(
//   {
//     MainCardStackNavigator,
//     [Route.ImportWalletQRCode]: ImportWalletQRCodeScreen,
//     [Route.ActionSheet]: ActionSheet,
//     UnlockTransactionNavaigator,
//     PasswordNavigator,
//     EditTextNavigator,
//     MessageNavigator,
//   },
//   {
//     headerMode: 'none',
//     mode: 'modal',
//     transparentCard: true,
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//     transitionConfig: () => ({
//       transitionSpec: {
//         duration: 100,
//         easing: Easing.inOut(Easing.quad),
//         timing: Animated.timing,
//       },
//       screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
//         const { position, scene } = sceneProps;
//         const { index } = scene;

//         const opacity = position.interpolate({
//           inputRange: [index - 1, index],
//           outputRange: [0, 1],
//         });

//         return { opacity };
//       },
//     }),
//   },
// );
