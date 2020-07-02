// import { NavigationContainerComponent, NavigationActions, StackActions } from 'react-navigation';
// import { EditTextProps } from 'screens/EditTextScreen';
// import { MessageProps } from 'screens/MessageScreen';

// import { Wallet, Transaction } from 'app/consts';
// import { ScanQrCodeProps } from 'app/screens/ScanQrCodeScreen';

// type MessageScreenProps = Partial<MessageProps>;
// type EditTextScreenProps = Partial<EditTextProps>;
// type WalletDetailsScreenProps = { wallet: Wallet };
// type TransactionDetailsScreenProps = { transaction: Transaction };
// type ScreenProps =
//   | MessageScreenProps
//   | EditTextScreenProps
//   | WalletDetailsScreenProps
//   | ScanQrCodeProps
//   | TransactionDetailsScreenProps;

import React from 'react';

export const navigationRef = React.createRef();
import { CommonActions } from '@react-navigation/native';

export default class NavigationService {
  // navigator;

  // constructor() {
  //   this.navigator = navigationRef;
  // }

  navigate = (name, params) => navigationRef.current?.navigate(name, params);

  // navigate = (routeName: string, params?: ScreenProps) => {
  // this.navigator!.dispatch(
  //   NavigationActions.navigate({
  //     routeName,
  //     params,
  //   }),
  // );
  // };

  pop = () => navigationRef.current?.goBack();

  popToTop = () => navigationRef.current?.popToTop();

  navigateWithReset = (routeName: string, params?: ScreenProps) => {
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    });
    navigationRef.current?.dispatch(navigateAction);
  };
}
