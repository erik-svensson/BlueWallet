import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, Chip } from 'app/components';
import { Authenticator } from 'app/consts';
import { ApplicationState } from 'app/state';
import { selectors } from 'app/state/authenticators';
import { AuthenticatorsState } from 'app/state/authenticators/reducer';
import { typography } from 'app/styles';

const i18n = require('../../../loc');

interface MapStateProps {
  authenticator?: Authenticator;
}

type Props = NavigationInjectedProps & MapStateProps;

class ExportAuthenticatorScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.authenticators.export.title} />,
  });

  renderMnemonic = (mnemonic: string) =>
    mnemonic.split(' ').map((word, index) => <Chip key={word} label={`${index + 1}. ${word}`} />);

  render() {
    const { authenticator } = this.props;

    return (
      <ScreenTemplate>
        <Text style={styles.subtitle}>{i18n.wallets.exportWallet.title}</Text>
        <View style={styles.qrCodeContainer}>
          {authenticator && <QRCode quietZone={10} value={authenticator.QRCode} size={140} ecl={'H'} />}
        </View>
        <View style={styles.mnemonicPhraseContainer}>{authenticator && this.renderMnemonic(authenticator.secret)}</View>
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

export default connect(mapStateToProps)(ExportAuthenticatorScreen);

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    ...typography.headline4,
    textAlign: 'center',
  },
  qrCodeContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  mnemonicPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
});
