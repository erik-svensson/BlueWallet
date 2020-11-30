import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors } from 'app/state/electrumX';

type checkNetworkConnectionArgs = (...args: any[]) => void;

const withCheckNetworkConnection = <P extends Record<string, any>>(Component: React.ComponentType<P>) => (props: P) => {
  const isInternetReachable = useSelector(selectors.isInternetReachable);
  const isServerConnected = useSelector(selectors.isServerConnected);

  const checkNetworkConnection = (func: checkNetworkConnectionArgs) => {
    if (!isInternetReachable) {
      Alert.alert('Nie ma neta');
      return;
    }
    if (!isServerConnected) {
      Alert.alert('Serwer dupa');
      return;
    }
    func();
  };

  return <Component {...props} checkNetworkConnection={checkNetworkConnection} />;
};

export default withCheckNetworkConnection;
