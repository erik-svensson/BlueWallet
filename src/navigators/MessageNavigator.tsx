import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import { MessageScreen } from 'app/screens';

const Stack = createStackNavigator();

export const MessageNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.Message} component={MessageScreen} />
  </Stack.Navigator>
);

//   {
//     []: ,
//   },
//   {
//     headerMode: 'none',
//     mode: 'modal',
//   },
// );
