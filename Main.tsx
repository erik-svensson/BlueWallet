import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import App from './App';

const Main = () => {
  useLayoutEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
      <App />
    </>
  );
};

export default Main;
