import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { View, YellowBox, StyleSheet, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CONST, Route } from 'app/consts';
import { BlueApp } from 'app/legacy';
import { i18n } from 'app/locale';
import { RootNavigator, PasswordNavigator } from 'app/navigators';
import { UnlockScreen } from 'app/screens';
import { SecureStorageService, AppStateManager, navigationRef, NavigationService } from 'app/services';
import { checkDeviceSecurity } from 'app/services/DeviceSecurityService';
import { persistor, store } from 'app/state/store';

import Routes from './Routes';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside', `\`-[RCTRootView cancelTouches]\``]);

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://dc67fd6d5c2949f2a6853e60eb69d899@o429172.ingest.sentry.io/5375289',
  });
}

interface State {
  isPinSet: boolean;
  successfullyAuthenticated: boolean;
  isTxPasswordSet: boolean;
  isLoading: boolean;
}

export default class App extends React.PureComponent<State> {
  state: State = {
    isLoading: true,
    isPinSet: false,
    successfullyAuthenticated: false,
    isTxPasswordSet: false,
  };
  async componentDidMount() {
    // await BlueApp.startAndDecrypt();
    // await SecureStorageService.setSecuredValue(CONST.pin, '');
    // await SecureStorageService.setSecuredValue(CONST.transactionPassword, '');
  }

  lockScreen = () => {
    this.setState({
      successfullyAuthenticated: false,
    });
  };

  render() {
    console.log('successfullyAuthenticated', this.state.successfullyAuthenticated);
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AppStateManager handleAppComesToBackground={this.lockScreen} />
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.wrapper}>
              <Routes />
            </View>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
