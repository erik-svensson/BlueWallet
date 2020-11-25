// import 'react-native-gesture-handler';

// import 'intl';
// import 'intl/locale-data/jsonp/en';
// import './shim.js';

import React from 'react';
import { AppRegistry, StatusBar, YellowBox, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import App from './App';
// import config from './config';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

if (!Error.captureStackTrace) {
  // captureStackTrace is only available when debugging
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Error.captureStackTrace = () => {};
}

class TestApp extends React.Component {
  render() {
    RNBootSplash.hide({ duration: 250 });

    return <View style={{ width: 30, height: 30, backgroundColor: 'red' }} />;
  }
}

// const BlueAppComponent = () => {
//   return (
//     <>
//       <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
//       <App />
//     </>
//   );
// };

AppRegistry.registerComponent('GoldWallet', () => TestApp);
