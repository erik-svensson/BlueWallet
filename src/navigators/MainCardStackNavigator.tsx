import { createStackNavigator } from 'react-navigation';

import { Route } from 'app/consts';
import { MainTabNavigator } from 'app/navigators/MainTabNavigator';
import { CreateWalletScreen, WalletDetailsScreen, ImportWalletScreen } from 'app/screens';
import { DeleteWalletScreen } from 'app/screens/DeleteWalletScreen';
import ImportWalletQRCodeScreen from '../../screen/wallets/scanQrWif';

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
    [Route.DeleteWallet]: DeleteWalletScreen,
    [Route.WalletDetails]: WalletDetailsScreen,
    [Route.ImportWalletQRCode]: ImportWalletQRCodeScreen,
  },
  {
    mode: 'card',
  },
);
