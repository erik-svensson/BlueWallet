import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, Mnemonic } from 'app/components';
import { Route, Authenticator } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors } from 'app/state/authenticators';
import { AuthenticatorsState } from 'app/state/authenticators/reducer';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

interface MapStateProps {
  authenticator?: Authenticator;
}

type Props = NavigationInjectedProps & MapStateProps;

class CreateAuthenticatorSuccessScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow={false} title={i18n.authenticators.add.title} />,
  });

  navigate = () => {
    const { navigation } = this.props;
    navigation.navigate(Route.AuthenticatorList);
  };

  render() {
    const { authenticator } = this.props;

    return (
      <ScreenTemplate footer={<Button onPress={this.navigate} title={i18n.wallets.addSuccess.okButton} />}>
        <Text style={styles.subtitle}>{i18n.wallets.addSuccess.subtitle}</Text>
        <Text style={styles.description}>{i18n.authenticators.add.successDescription}</Text>
        {authenticator && <Mnemonic mnemonic={authenticator.secret} />}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState & AuthenticatorsState, props: Props): MapStateProps => {
  const id = props.navigation.getParam('id');
  return {
    authenticator: selectors.getById(state, id),
  };
};

export default connect(mapStateToProps)(CreateAuthenticatorSuccessScreen);

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    marginBottom: 20,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
});
