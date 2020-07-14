import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';

import { Header, ScreenTemplate, FlatButton, Button } from 'app/components';
import { Route } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { Authenticator } from 'app/legacy';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

type Props = NavigationInjectedProps;

class CreateAuthenticatorScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.authenticators.add.title} />,
  });

  scanQRCode = () => {
    const { navigation } = this.props;
    navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (data: any) => {
        navigation.goBack();
        CreateMessage({
          title: i18n.message.creatingWallet,
          description: i18n.message.creatingWalletDescription,
          type: MessageType.processingState,
          asyncTask: () => this.createAuthenticator(data),
        });
      },
    });
  };
  componentWillUnmount() {
    console.log('UNMOUNTED');
  }

  createAuthenticator = async (data: any) => {
    const { navigation } = this.props;
    console.log('DATA', data);
    const { name, entropy } = { name: 'wallet_aut', entropy: '8e14a1b168adbd256f00753f4ef4fa2b' };
    const authenticator = new Authenticator(name);
    await authenticator.init(entropy);
    console.log('authenticator', authenticator);

    navigation.navigate(Route.EnterPIN, { authenticator });
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScreenTemplate
        footer={
          <>
            {/* {this.state.isLoading && ( */}
            <Text style={styles.isLoadingDescription}>{i18n.message.creatingWalletDescription}</Text>
            {/* )} */}
            <Button
              // disabled={!this.canCreateWallet}
              // loading={this.state.isLoading}
              onPress={this.scanQRCode}
              title={i18n.wallets.publicKey.scan}
            />
            <FlatButton
              // onPress={this.navigateToImportWallet}
              containerStyle={styles.importButtonContainer}
              title={i18n.authenticators.import.title}
            />
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.authenticators.add.subtitle}</Text>
        <Text style={styles.description}>{i18n.authenticators.add.description}</Text>
      </ScreenTemplate>
    );
  }
}

export default CreateAuthenticatorScreen;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 12,
    marginBottom: 18,
    ...typography.headline4,
    textAlign: 'center',
  },
  description: {
    marginBottom: 52,
    color: palette.textGrey,
    ...typography.caption,
    textAlign: 'center',
  },
  isLoadingDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
    marginVertical: 10,
  },
  advancedOptionsLabel: {
    color: palette.textGrey,
    marginBottom: 12,
  },
  radioButton: {
    paddingStart: 0,
    paddingVertical: 8,
  },
  radioButtonContent: {
    paddingStart: 10,
    top: -3,
  },
  radioButtonTitle: {
    ...typography.caption,
    marginBottom: 2,
  },
  radioButtonSubtitle: {
    ...typography.overline,
    color: palette.textGrey,
  },
  importButtonContainer: {
    marginTop: 12,
  },
});
