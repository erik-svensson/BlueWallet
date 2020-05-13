import { createStackNavigator } from 'react-navigation';

import { Route } from 'app/consts';
import { CreatePinScreen, ConfirmPinScreen } from 'app/screens';

export const PinNavigator = createStackNavigator(
  {
    [Route.CreatePin]: CreatePinScreen,
    [Route.ConfirmPin]: ConfirmPinScreen,
  },
  {
    headerMode: 'screen',
  },
);
