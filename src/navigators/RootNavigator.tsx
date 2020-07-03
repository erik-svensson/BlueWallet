import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import {
  ActionSheet,
  ImportWalletQRCodeScreen,
  ExportWalletScreen,
  ExportWalletXpubScreen,
  DeleteWalletScreen,
  DeleteContactScreen,
  SendTransactionDetailsScreen,
  MessageScreen,
} from 'app/screens';

import { EditTextNavigator } from './EditTextNavigator';
import { MainCardStackNavigator } from './MainCardStackNavigator';
import { PasswordNavigator } from './PasswordNavigator';
import { UnlockTransactionNavaigator } from './UnlockTransactionNavaigator';

const Stack = createStackNavigator();

export const RootNavigator = () => (
  <Stack.Navigator initialRouteName={Route.MainCardStackNavigator} headerMode="none" mode="modal">
    <Stack.Screen name={Route.MainCardStackNavigator} component={MainCardStackNavigator} />
    <Stack.Screen name={Route.ImportWalletQRCode} component={ImportWalletQRCodeScreen} />
    <Stack.Screen name={Route.ActionSheet} component={ActionSheet} options={modalOptions} />
    <Stack.Screen name={Route.UnlockTransactionNavaigator} component={UnlockTransactionNavaigator} />
    <Stack.Screen name={Route.PasswordNavigator} component={PasswordNavigator} />
    <Stack.Screen name={Route.EditTextNavigator} component={EditTextNavigator} />
    <Stack.Screen name={Route.Message} component={MessageScreen} />
    <Stack.Screen name={Route.ExportWallet} component={ExportWalletScreen} />
    <Stack.Screen name={Route.ExportWalletXpub} component={ExportWalletXpubScreen} />
    <Stack.Screen name={Route.DeleteWallet} component={DeleteWalletScreen} />
    <Stack.Screen name={Route.DeleteContact} component={DeleteContactScreen} />
    <Stack.Screen name={Route.SendTransactionDetails} component={SendTransactionDetailsScreen} />
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
