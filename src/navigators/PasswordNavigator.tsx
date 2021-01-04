import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import {
  CreateTransactionPassword,
  ConfirmTransactionPassword,
  CreatePinScreen,
  ConfirmPinScreen,
  MessageScreen,
  ConfirmNotificationCodeScreen,
  AddNotificationEmailScreen,
  ChooseWalletsForNotificationScreen,
} from 'app/screens';

const Stack = createStackNavigator();

export const PasswordNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.CreatePin} component={CreatePinScreen} />
    <Stack.Screen name={Route.ConfirmPin} component={ConfirmPinScreen} />
    <Stack.Screen name={Route.CreateTransactionPassword} component={CreateTransactionPassword} />
    <Stack.Screen name={Route.ConfirmTransactionPassword} component={ConfirmTransactionPassword} />
    {/* <Stack.Screen name={Route.AddNotificationEmail} component={AddNotificationEmailScreen} />
    <Stack.Screen name={Route.ChooseWalletsForNotification} component={ChooseWalletsForNotificationScreen} />
    <Stack.Screen name={Route.ConfirmNotificationCode} component={ConfirmNotificationCodeScreen} /> */}
    <Stack.Screen name={Route.Message} component={MessageScreen} options={{}} />
  </Stack.Navigator>
);
