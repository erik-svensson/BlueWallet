import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Share from 'react-native-share';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Button, TextAreaItem } from 'app/components';
import { Route, Authenticator, MainCardStackNavigatorParams } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors } from 'app/state/authenticators';
import { AuthenticatorsState } from 'app/state/authenticators/reducer';
import { palette, typography, fonts } from 'app/styles';

const i18n = require('../../../loc');

interface MapStateProps {
  authenticator?: Authenticator;
}

interface Props extends MapStateProps {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.EnterPIN>;
  route: RouteProp<MainCardStackNavigatorParams, Route.PairAuthenticator>;
}

class PairAuthenticatorScreen extends Component<Props> {
  share = () => {
    const { authenticator } = this.props;
    Share.open({ message: authenticator?.exportPublicKey });
  };

  renderPIN = (pin: string) => (
    <View style={styles.pinWrapper}>
      {pin.split('').map((char, index) => (
        <View style={styles.pinNumber} key={index}>
          <Text style={styles.pinNumberText}>{char}</Text>
        </View>
      ))}
    </View>
  );

  render() {
    const { authenticator, navigation } = this.props;

    if (!authenticator) {
      return null;
    }
    return (
      <ScreenTemplate
        footer={<Button onPress={this.share} title={i18n.receive.details.share} />}
        header={<Header navigation={navigation} title={i18n.authenticators.add.title} />}
      >
        <Text style={styles.subtitle}>{i18n.authenticators.enterPIN.subtitle}</Text>
        {/* <Text style={styles.description}>{i18n.authenticators.enterPIN.description}</Text> */}
        {this.renderPIN(authenticator.pin)}
        <TextAreaItem
          value={authenticator.exportPublicKey}
          editable={false}
          // placeholder={i18n.wallets.importWallet.placeholder}
          style={styles.textArea}
        />
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState & AuthenticatorsState, props: Props): MapStateProps => {
  const { id } = props.route.params;
  return {
    authenticator: selectors.getById(state, id),
  };
};

export default connect(mapStateToProps)(PairAuthenticatorScreen);

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  textArea: {
    marginTop: 24,
    height: 130,
  },
  description: {
    marginBottom: 52,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
  pinNumber: {
    paddingBottom: 6,
    width: 40,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  pinWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinNumberText: {
    textAlign: 'center',
    fontFamily: fonts.ubuntu.light,
    fontSize: 24,
  },
});
