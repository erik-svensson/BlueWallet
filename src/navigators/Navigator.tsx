import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { connect } from 'react-redux';

import { RootNavigator, PasswordNavigator, UnlockNavigator } from 'app/navigators';
import { UnlockScreen } from 'app/screens';
import { navigationRef } from 'app/services';
import { checkDeviceSecurity } from 'app/services/DeviceSecurityService';
import { ApplicationState } from 'app/state';
import { checkCredentials as checkCredentialsAction } from 'app/state/authentication/actions';

interface MapStateToProps {
  isPinSet: boolean;
  isAuthenticated: boolean;
  isTxPasswordSet: boolean;
  isLoading: boolean;
}

interface ActionsDisptach {
  checkCredentials: Function;
}

type Props = MapStateToProps & ActionsDisptach;

class Navigator extends React.Component<Props> {
  async componentDidMount() {
    const { checkCredentials } = this.props;
    checkCredentials();
    if (!__DEV__) {
      checkDeviceSecurity();
    }
  }

  shouldRenderOnBoarding = () => {
    const { isPinSet, isTxPasswordSet } = this.props;

    return !isPinSet || !isTxPasswordSet;
  };

  shouldRenderRootNavigator = () => {
    const { isPinSet, isTxPasswordSet, isAuthenticated } = this.props;

    return isPinSet && isTxPasswordSet && isAuthenticated;
  };

  shouldRenderUnlockScreen = () => {
    const { isPinSet, isTxPasswordSet, isAuthenticated } = this.props;

    return !isAuthenticated && isTxPasswordSet && isPinSet;
  };

  renderRoutes = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return null;
    }

    if (this.shouldRenderOnBoarding()) {
      return <PasswordNavigator />;
    }

    // if (this.shouldRenderRootNavigator()) {
    // <UnlockNavigator />

    return (
      <>
        <RootNavigator />
        {this.shouldRenderUnlockScreen() && <UnlockScreen />}
      </>
    );
    // }

    // if (this.shouldRenderUnlockScreen()) {
    //   return <UnlockNavigator />;
    // }
  };

  render() {
    console.log('navigationRe', navigationRef);
    console.log('navigationRef?.current', navigationRef?.current);
    return <NavigationContainer ref={navigationRef as any}>{this.renderRoutes()}</NavigationContainer>;
  }
}

const mapStateToProps = (state: ApplicationState): MapStateToProps => ({
  isLoading: state.authentication.isLoading,
  isPinSet: state.authentication.isPinSet,
  isTxPasswordSet: state.authentication.isTxPasswordSet,
  isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps: ActionsDisptach = {
  checkCredentials: checkCredentialsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
