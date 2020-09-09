import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { View, YellowBox, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CONST, Route } from 'app/consts';
import { BlueApp } from 'app/legacy';
import { i18n } from 'app/locale';
import { RootNavigator, PasswordNavigator } from 'app/navigators';
import { UnlockScreen } from 'app/screens';
import { SecureStorageService, AppStateManager, navigationRef, NavigationService } from 'app/services';
import { checkDeviceSecurity } from 'app/services/DeviceSecurityService';

interface State {
  isPinSet: boolean;
  successfullyAuthenticated: boolean;
  isTxPasswordSet: boolean;
  isLoading: boolean;
}

export default class Routes extends React.PureComponent<State> {
  state: State = {
    isLoading: true,
    isPinSet: false,
    successfullyAuthenticated: false,
    isTxPasswordSet: false,
  };

  async componentDidMount() {
    console.log('PROPS', this.props);
    // NavigationService.navigate(Route.CreateWallet);
    console.log('DUPA');
    await BlueApp.startAndDecrypt();

    const pin = await SecureStorageService.getSecuredValue(CONST.pin);
    const txPassword = await SecureStorageService.getSecuredValue(CONST.transactionPassword);

    if (pin) {
      this.setState({ isPinSet: true });
    }
    if (txPassword) {
      this.setState({ isTxPasswordSet: true });
    }
    if (!__DEV__) {
      checkDeviceSecurity();
    }
    this.setState({ isLoading: false });
  }

  lockScreen = () => {
    this.setState({
      successfullyAuthenticated: false,
    });
  };

  onSuccessfullyAuthenticated = () => {
    this.setState({
      successfullyAuthenticated: true,
    });
  };

  shouldRenderOnBoarding = () => {
    const { isPinSet, isTxPasswordSet, isLoading } = this.state;

    return !isLoading && (!isPinSet || !isTxPasswordSet);
  };

  shouldRenderRootNavigator = () => {
    const { isPinSet, isTxPasswordSet, isLoading, successfullyAuthenticated } = this.state;

    return !isLoading && isPinSet && isTxPasswordSet && successfullyAuthenticated;
  };

  shouldRenderUnlockScreen = () => {
    const { isPinSet, isTxPasswordSet, isLoading, successfullyAuthenticated } = this.state;

    return !isLoading && !successfullyAuthenticated && isTxPasswordSet && isPinSet;
  };

  render() {
    console.log('successfullyAuthenticated', this.state.successfullyAuthenticated);
    const { isLoading } = this.props;
    // const isBiometricEnabledByUser = store.getState().appSettings.isBiometricsEnabled;
    const isBiometricEnabledByUser = true;

    return (
      <NavigationContainer ref={navigationRef as any}>
        {isLoading && (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
        {this.shouldRenderOnBoarding() && <PasswordNavigator />}
        {this.shouldRenderRootNavigator() && <RootNavigator />}
        {this.shouldRenderUnlockScreen() && (
          <UnlockScreen
            onSuccessfullyAuthenticated={this.onSuccessfullyAuthenticated}
            isBiometricEnabledByUser={isBiometricEnabledByUser}
          />
        )}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
