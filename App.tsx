import * as Sentry from '@sentry/react-native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { View, YellowBox, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { i18n as i18nReact } from 'app/locale';
import { Navigator } from 'app/navigators';
import { AppStateManager } from 'app/services';
import { AuthenticationAction } from 'app/state/authentication/actions';
import { persistor, store } from 'app/state/store';

const i18n = require('./loc');

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside', `\`-[RCTRootView cancelTouches]\``]);

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://dc67fd6d5c2949f2a6853e60eb69d899@o429172.ingest.sentry.io/5375289',
  });
}

const getNewKey = () => new Date().toISOString();

const context = {
  lang: i18n.lang,
  // eslint-disable-next-line
  changeLanguage: (lang: string) => {},
};

export const GlobalContext = React.createContext(context);

interface State {
  unlockKey: string;
  lang: string;
}
export default class App extends React.PureComponent<State> {
  state = {
    unlockKey: getNewKey(),
    lang: i18n.lang,
  };
  lockScreen = () => {
    store.dispatch({
      type: AuthenticationAction.SetIsAuthenticated,
      isAuthenticated: false,
    });
  };

  setUnlockScreenKey = () => {
    this.setState({
      unlockKey: getNewKey(),
    });
  };

  changeLanguage = (lang: string) => {
    this.setState({ lang });
  };

  render() {
    const { lang } = this.state;
    return (
      <I18nextProvider i18n={i18nReact}>
        <GlobalContext.Provider
          value={{
            lang,
            changeLanguage: (language: string) => this.changeLanguage(language),
          }}
        >
          <Provider store={store}>
            <AppStateManager
              handleAppComesToForeground={this.setUnlockScreenKey}
              handleAppComesToBackground={this.lockScreen}
            />
            <PersistGate loading={null} persistor={persistor}>
              <View style={styles.wrapper}>
                <Navigator key={lang} unlockKey={this.state.unlockKey} />
              </View>
            </PersistGate>
          </Provider>
        </GlobalContext.Provider>
      </I18nextProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
