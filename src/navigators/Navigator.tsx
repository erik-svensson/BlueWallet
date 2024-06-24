import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import JailMonkey from 'jail-monkey';
import React from 'react';
import { isEmulator } from 'react-native-device-info';
import { connect } from 'react-redux';

import config from 'app/config';
import { CONST, USER_VERSIONS, Route, EnhancedTransaction } from 'app/consts';
import { Toasts } from 'app/containers';
import { RenderMessage, MessageType } from 'app/helpers/MessageCreator';
import { BlueApp } from 'app/legacy';
import { RootNavigator } from 'app/navigators';
import { UnlockScreen, TermsConditionsScreen, ConnectionIssuesScreen } from 'app/screens';
import { BetaVersionScreen } from 'app/screens/BetaVersionScreen';
import ChamberOfSecrets from 'app/screens/ChamberOfSecrets';
import { navigationRef } from 'app/services';
import { checkDeviceSecurity } from 'app/services/DeviceSecurityService';
import { ApplicationState } from 'app/state';
import { selectors as appSettingsSelectors } from 'app/state/appSettings';
import {
  updateSelectedLanguage as updateSelectedLanguageAction,
  setIsToast,
  countBadge,
} from 'app/state/appSettings/actions';
import { selectors as authenticationSelectors } from 'app/state/authentication';
import {
  checkCredentials as checkCredentialsAction,
  checkUserVersion as checkUserVersionAction,
  checkTc as checkTcAction,
  CheckUserVersionAction,
} from 'app/state/authentication/actions';
import { selectors as electrumXSelectors } from 'app/state/electrumX';
import {
  startListeners,
  StartListenersAction,
  checkConnection as checkConnectionAction,
  CheckConnectionAction,
} from 'app/state/electrumX/actions';
import { selectors as notificationSelectors } from 'app/state/notifications';
import { addToastMessage } from 'app/state/toastMessages/actions';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { loadWallets, LoadWalletsAction } from 'app/state/wallets/actions';
import { isAndroid, isIos } from 'app/styles';

const i18n = require('../../loc');

interface MapStateToProps {
  isPinSet: boolean;
  isTcAccepted: boolean;
  isAuthenticated: boolean;
  isTxPasswordSet: boolean;
  isNotificationEmailSet: boolean;
  isLoading: boolean;
  language: string;
  isInitialized: boolean;
  hasConnectedToServerAtLeaseOnce: boolean;
  userVersion: USER_VERSIONS;
  isToast: boolean;
  allTransactions: EnhancedTransaction[];
  badge: number;
}

interface ActionsDispatch {
  checkCredentials: Function;
  startElectrumXListeners: () => StartListenersAction;
  updateSelectedLanguage: Function;
  checkTc: Function;
  checkConnection: () => CheckConnectionAction;
  checkUserVersion: () => CheckUserVersionAction;
  loadWallets: () => LoadWalletsAction;
  setIsToast: Function;
  addToastMessage: Function;
  countBadge: (val: number) => void;
}

interface OwnProps {
  unlockKey: string;
}

type Props = MapStateToProps & ActionsDispatch & OwnProps;

interface State {
  isBetaVersionRiskAccepted: boolean;
  isEmulator: boolean;
  isChamberOfSecretsClosed: boolean;
}

class Navigator extends React.Component<Props, State> {
  state = {
    isBetaVersionRiskAccepted: false,
    isEmulator: false,
    isChamberOfSecretsClosed: false,
  };

  async componentDidMount() {
    const { checkCredentials, startElectrumXListeners, checkTc, checkConnection, checkUserVersion } = this.props;

    await BlueApp.startAndDecrypt();

    checkUserVersion();
    checkTc();
    checkCredentials();
    startElectrumXListeners();
    checkConnection();
    this.initLanguage();
    this.handleNotification();

    isEmulator().then(isEmulator => {
      this.setState({
        isEmulator,
      });

      if (!isEmulator && !__DEV__) {
        checkDeviceSecurity();
      }
    });
  }

  handleNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      PushNotificationIOS.setApplicationIconBadgeNumber(this.props.badge + 1);
      this.props.countBadge(this.props.badge + 1);
      if (remoteMessage.data) {
        this.props.loadWallets();
      }
    });

    messaging().onMessage(async remoteMessage => {
      this.props.loadWallets();
      if (remoteMessage.messageId) {
        this.props.loadWallets();
        this.props.setIsToast(true);
        setTimeout(() => {
          this.props.addToastMessage({
            title: remoteMessage.notification?.title || '',
            description: remoteMessage.notification?.body || '',
            id: remoteMessage.data?.tx,
            status: remoteMessage.data?.failed,
          });
        }, 10000);
      }
    });
  };

  async componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            if (remoteMessage.messageId) {
              this.props.loadWallets();
              if (isIos()) {
                setTimeout(() => {
                  this.handleClickToast(remoteMessage.data?.tx);
                }, 1000);
              } else {
                this.handleClickToast(remoteMessage.data?.tx);
              }
            }
          }
        });

      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage.data) {
          this.handleClickToast(remoteMessage.data?.tx);
        }
      });
    }
  }

  initLanguage = async () => {
    const { language, updateSelectedLanguage } = this.props;
    const detectedLanguage = (await AsyncStorage.getItem('lang')) || CONST.defaultLanguage;

    if (language !== detectedLanguage) {
      updateSelectedLanguage(detectedLanguage);
    }
  };

  shouldRenderCredentialsCreation = () => {
    const { isPinSet, isTxPasswordSet } = this.props;

    return !isPinSet || !isTxPasswordSet;
  };

  shouldRenderNotification = () => {
    const { isNotificationEmailSet } = this.props;

    return !isNotificationEmailSet;
  };

  shouldRenderUnlockScreen = () => {
    const { isPinSet, isTxPasswordSet, isAuthenticated } = this.props;

    if (__DEV__) {
      return false;
    }

    return !isAuthenticated && isTxPasswordSet && isPinSet;
  };

  shouldRenderConnectionIssues = () => {
    const { hasConnectedToServerAtLeaseOnce } = this.props;

    if (this.shouldRenderUnlockScreen()) {
      return false;
    }
    return !hasConnectedToServerAtLeaseOnce && !this.shouldRenderCredentialsCreation();
  };

  preventOpenAppWithRootedPhone = () => {
    if (isIos()) {
      return RenderMessage({
        description: i18n.security.jailBrokenPhone,
        title: i18n.security.title,
        type: MessageType.error,
      });
    } else if (isAndroid()) {
      return RenderMessage({
        description: i18n.security.rootedPhone,
        title: i18n.security.title,
        type: MessageType.error,
      });
    }
  };

  handleAcceptBetaVersionRisk = () => {
    this.setState({ isBetaVersionRiskAccepted: true });
  };

  handleOpenChamberOfSecrets = () => {
    this.setState({ isChamberOfSecretsClosed: true });
  };

  handleClickToast = (id: string | undefined) => {
    const { allTransactions } = this.props;
    const selectedTransaction = allTransactions.filter(t => t.txid === id);

    if (!!navigationRef.current && selectedTransaction.length) {
      navigationRef.current?.navigate(Route.TransactionDetails, { transaction: selectedTransaction[0] });
    }
  };

  renderRoutes = () => {
    const { isLoading, unlockKey, isAuthenticated, isTcAccepted, userVersion, isToast } = this.props;

    if (isLoading) {
      return null;
    }

    if (process.env.CHAMBER_OF_SECRETS === 'true' && !this.state.isChamberOfSecretsClosed) {
      return <ChamberOfSecrets onButtonPress={this.handleOpenChamberOfSecrets} />;
    }

    if (!isTcAccepted) {
      return <TermsConditionsScreen />;
    }

    if (!__DEV__ && JailMonkey.isJailBroken() && !this.state.isEmulator) {
      return this.preventOpenAppWithRootedPhone();
    }

    if (!__DEV__ && config.isBeta && !this.state.isBetaVersionRiskAccepted) {
      return <BetaVersionScreen onButtonPress={this.handleAcceptBetaVersionRisk} />;
    }
    return (
      <>
        <RootNavigator
          shouldRenderCredentialsCreation={this.shouldRenderCredentialsCreation()}
          shouldRenderNotification={this.shouldRenderNotification()}
          userVersion={userVersion}
        />
        {isAuthenticated ? <Toasts /> : null}
        {isToast ? <Toasts onClick={this.handleClickToast} /> : null}
        {this.shouldRenderConnectionIssues() ? <ConnectionIssuesScreen /> : null}
        {this.shouldRenderUnlockScreen() ? <UnlockScreen key={unlockKey} /> : null}
      </>
    );
  };

  render() {
    return (
      <NavigationContainer key={this.props.language} ref={navigationRef}>
        {this.renderRoutes()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
  userVersion: authenticationSelectors.userVersion(state),
  isTcAccepted: authenticationSelectors.isTcAccepted(state),
  isLoading: authenticationSelectors.isLoading(state),
  isPinSet: authenticationSelectors.isPinSet(state),
  isTxPasswordSet: authenticationSelectors.isTxPasswordSet(state),
  isNotificationEmailSet: notificationSelectors.isNotificationEmailSet(state),
  isAuthenticated: authenticationSelectors.isAuthenticated(state),
  language: appSettingsSelectors.language(state),
  isToast: appSettingsSelectors.isToast(state),
  isInitialized: walletsSelectors.isInitialized(state),
  hasConnectedToServerAtLeaseOnce: electrumXSelectors.hasConnectedToServerAtLeaseOnce(state),
  allTransactions: walletsSelectors.transactions(state),
  badge: state.appSettings.badge,
});

const mapDispatchToProps: ActionsDispatch = {
  checkCredentials: checkCredentialsAction,
  checkTc: checkTcAction,
  startElectrumXListeners: startListeners,
  updateSelectedLanguage: updateSelectedLanguageAction,
  checkConnection: checkConnectionAction,
  checkUserVersion: checkUserVersionAction,
  loadWallets,
  setIsToast,
  addToastMessage,
  countBadge,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
