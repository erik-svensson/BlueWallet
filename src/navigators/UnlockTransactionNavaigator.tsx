import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import { UnlockTransaction } from 'app/screens';

const Stack = createStackNavigator();

export const UnlockTransactionNavaigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.UnlockTransaction} component={UnlockTransaction} />
  </Stack.Navigator>
);
