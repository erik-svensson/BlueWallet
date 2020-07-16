import React, { Component } from 'react';
import { NavigationInjectedProps } from 'react-navigation';

import { Header } from 'app/components';
import { Route } from 'app/consts';

const i18n = require('../../../loc');

type Props = NavigationInjectedProps;

class AuthenticatorListScreen extends Component<Props> {
  static navigationOptions = () => ({
    // must be dynamic, as function as language switch stops to work
    tabBarLabel: i18n.tabNavigator.authenticators,
  });

  render() {
    const { navigation } = this.props;
    return (
      <Header
        title={i18n.tabNavigator.authenticators}
        addFunction={() => navigation.navigate(Route.CreateAuthenticator)}
      />
    );
  }
}

export default AuthenticatorListScreen;
