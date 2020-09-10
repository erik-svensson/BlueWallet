import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import { UnlockScreen, TimeCounterScreen } from 'app/screens';

const Stack = createStackNavigator();

export const UnlockNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.Unlock} component={UnlockScreen} />
    <Stack.Screen name={Route.TimeCounter} options={{ gestureEnabled: false }} component={TimeCounterScreen} />
  </Stack.Navigator>
);
