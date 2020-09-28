import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { Route, RootStackParams } from 'app/consts';
import {
  ActionSheet,
  ExportWalletScreen,
  ExportWalletXpubScreen,
  DeleteContactScreen,
  SendTransactionDetailsScreen,
  MessageScreen,
  EditTextScreen,
  UnlockTransaction,
} from 'app/screens';

import { MainCardStackNavigator } from './MainCardStackNavigator';

const Stack = createStackNavigator<RootStackParams>();

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName={Route.MainCardStackNavigator} headerMode="none">
    <Stack.Screen name={Route.MainCardStackNavigator} component={MainCardStackNavigator} />
    <Stack.Screen name={Route.ActionSheet} component={ActionSheet} options={modalOptions} />
    <Stack.Screen name={Route.UnlockTransaction} component={UnlockTransaction} />
    <Stack.Screen name={Route.EditText} component={EditTextScreen} />
    <Stack.Screen name={Route.Message} component={MessageScreen} options={{}} />
    <Stack.Screen name={Route.ExportWallet} component={ExportWalletScreen} />
    <Stack.Screen name={Route.ExportWalletXpub} component={ExportWalletXpubScreen} />
    <Stack.Screen name={Route.DeleteContact} component={DeleteContactScreen} />
    <Stack.Screen name={Route.SendTransactionDetails} component={SendTransactionDetailsScreen} />
  </Stack.Navigator>
);

const animConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  // transitionSpec: {
  //   open: animConfig,
  //   close: animConfig,
  // },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    // overlayStyle: {
    //   opacity: progress.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [0, 0.6],
    //     extrapolate: 'clamp',
    //   }),
    // },
  }),
} as StackNavigationOptions;
