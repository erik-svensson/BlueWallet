import * as Sentry from '@sentry/react-native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { View, YellowBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { i18n } from 'app/locale';
import { Navigator } from 'app/navigators';
import { AppStateManager } from 'app/services';
import { AuthenticationAction } from 'app/state/authentication/actions';
import { persistor, store } from 'app/state/store';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside', `\`-[RCTRootView cancelTouches]\``]);

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://dc67fd6d5c2949f2a6853e60eb69d899@o429172.ingest.sentry.io/5375289',
  });
}

export default class App extends React.PureComponent {
  async componentDidMount() {
    // // await BlueApp.startAndDecrypt();
    // await SecureStorageService.setSecuredValue(CONST.pin, '');
    // await SecureStorageService.setSecuredValue(CONST.transactionPassword, '');
  }

  lockScreen = () => {
    store.dispatch({
      type: AuthenticationAction.SetIsAuthenticated,
      isAuthenticated: false,
    });
  };

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AppStateManager handleAppComesToBackground={this.lockScreen} />
          <PersistGate loading={null} persistor={persistor}>
            <View style={styles.wrapper}>
              <Navigator />
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
