import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Route } from 'app/consts';
import { EditTextScreen } from 'app/screens/EditTextScreen';

const Stack = createStackNavigator();

export const EditTextNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.EditText} component={EditTextScreen} />
  </Stack.Navigator>
);
