import * as Sentry from '@sentry/react-native';
import React, { useEffect } from 'react';
import { StatusBar, AppState, AppStateStatus } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import App from './App';

const Main = () => {
  useEffect(() => {
    const listener = (state: AppStateStatus) => {
      switch (state) {
        case 'active':
          return RNBootSplash.hide({ fade: true }).catch(error => {
            Sentry.captureException(error);
          });
        case 'inactive':
          return RNBootSplash.show().catch(error => {
            Sentry.captureException(error);
          });
      }
    };

    AppState.addEventListener('change', listener);

    return () => {
      AppState.removeEventListener('change', listener);
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
      <App />
    </>
  );
};

export default Main;
