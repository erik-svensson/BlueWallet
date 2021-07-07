import React from 'react';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';

import App from './App';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 30 * 60,
};

const Main = () => {
  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
      <App />
    </>
  );
};

export default codePush(codePushOptions)(Main);
