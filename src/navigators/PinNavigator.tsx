import { createStackNavigator } from 'react-navigation';

import { Route } from 'app/consts';
import { CreatePinScreen, ConfirmPinScreen, CurrentPinScreen, CreateTransactionPassword } from 'app/screens';

export const PinNavigator = createStackNavigator(
  {
    [Route.CurrentPin]: CurrentPinScreen,
    [Route.CreatePin]: CreatePinScreen,
    [Route.ConfirmPin]: ConfirmPinScreen,
    [Route.CreateTransactionPassword]: CreateTransactionPassword,
  },
  {
    headerMode: 'screen',
  },
);
