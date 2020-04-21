import { createStackNavigator } from 'react-navigation';

import { Route } from 'app/consts';
import { MainTabNavigator } from 'app/navigators/MainTabNavigator';
import { CreateWalletScreen, WalletDetailsScreen, ImportWalletScreen, ExportWalletScreen } from 'app/screens';

export const MainCardStackNavigator = createStackNavigator(
  {
    MainTabNavigator: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    [Route.CreateWallet]: CreateWalletScreen,
    [Route.ImportWallet]: ImportWalletScreen,
    [Route.WalletDetails]: WalletDetailsScreen,
    [Route.ExportWallet]: ExportWalletScreen,
  },
  {
    mode: 'card',
  },
);
