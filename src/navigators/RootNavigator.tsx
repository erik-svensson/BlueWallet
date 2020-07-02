import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Easing, Animated, View } from 'react-native';

import { Route } from 'app/consts';
import {
  ActionSheet,
  ImportWalletQRCodeScreen,
  ExportWalletScreen,
  ExportWalletXpubScreen,
  DeleteWalletScreen,
  DeleteContactScreen,
  SendTransactionDetailsScreen,
  ScanQrCodeScreen,
} from 'app/screens';

import { EditTextNavigator } from './EditTextNavigator';
import { MainCardStackNavigator } from './MainCardStackNavigator';
import { MessageNavigator } from './MessageNavigator';
import { PasswordNavigator } from './PasswordNavigator';
import { UnlockTransactionNavaigator } from './UnlockTransactionNavaigator';

const Stack = createStackNavigator();

// const HomeScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />;
// const DetailsScreen = () => <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />;

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName="MainCardStackNavigator" headerMode="none" mode="modal">
    <Stack.Screen name="MainCardStackNavigator" component={MainCardStackNavigator} />
    <Stack.Screen name={Route.ImportWalletQRCode} component={ImportWalletQRCodeScreen} />
    <Stack.Screen name={Route.ActionSheet} component={ActionSheet} options={modalOptions} />
    <Stack.Screen name="UnlockTransactionNavaigator" component={UnlockTransactionNavaigator} />
    <Stack.Screen name="PasswordNavigator" component={PasswordNavigator} />
    <Stack.Screen name="EditTextNavigator" component={EditTextNavigator} />
    <Stack.Screen name="MessageNavigator" component={MessageNavigator} />
    <Stack.Screen name={Route.ExportWallet} component={ExportWalletScreen} />
    <Stack.Screen name={Route.ExportWalletXpub} component={ExportWalletXpubScreen} />
    <Stack.Screen name={Route.DeleteWallet} component={DeleteWalletScreen} />
    <Stack.Screen name={Route.DeleteContact} component={DeleteContactScreen} />
    <Stack.Screen name={Route.SendTransactionDetails} component={SendTransactionDetailsScreen} />
    <Stack.Screen name={Route.ScanQrCode} component={ScanQrCodeScreen} />
  </Stack.Navigator>
);

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({ current: { progress } }) => ({
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp',
      }),
    },
  }),
};

// const modalOptions = {
//   headerMode: 'none',
//   mode: 'modal',
//   transparentCard: true,
//   navigationOptions: {
//     gesturesEnabled: false,
//   },
//   transitionConfig: () => ({
//     transitionSpec: {
//       duration: 100,
//       easing: Easing.inOut(Easing.quad),
//       timing: Animated.timing,
//     },
//     screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
//       const { position, scene } = sceneProps;
//       const { index } = scene;

//       const opacity = position.interpolate({
//         inputRange: [index - 1, index],
//         outputRange: [0, 1],
//       });

//       return { opacity };
//     },
//   }),
// };
