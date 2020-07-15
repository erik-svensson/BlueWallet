import React, { Component } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { Header, ScreenTemplate, FlatButton, Button } from 'app/components';
import { Route, Authenticator as IAuthenticator } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { actions } from 'app/state/authenticators';
import { palette, typography } from 'app/styles';

const i18n = require('../../../loc');

interface ActionProps {
  createAuthenticator: Function;
}

type Props = NavigationInjectedProps & ActionProps;

class CreateAuthenticatorScreen extends Component<Props> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.authenticators.add.title} />,
  });

  scanQRCode = () => {
    const { navigation } = this.props;
    navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (data: string) => {
        navigation.goBack();
        CreateMessage({
          title: i18n.message.creatingAuthenticator,
          description: i18n.message.creatingAuthenticatorDescription,
          type: MessageType.processingState,
          asyncTask: () => this.createAuthenticator(data),
        });
      },
    });
  };

  onCreateAuthenticatorFailure = (error: string) => {
    const { navigation } = this.props;

    Alert.alert('Error', error, [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate(Route.CreateAuthenticator);
        },
      },
    ]);
  };
  createAuthenticator = async (json: string) => {
    const { navigation, createAuthenticator } = this.props;
    try {
      const data = { name: 'wallet_aut', entropy: '8e14a1b168adbd256f00753f4ef4fa2b' };
      // const data = JSON.parse(json);
      // if (!data.entropy || !data.name) {
      //   throw new Error('Invalid data');
      // }
      createAuthenticator(data, {
        onSuccess: (authenticator: IAuthenticator) => navigation.navigate(Route.EnterPIN, { id: authenticator.id }),
        onFailure: (error: string) => this.onCreateAuthenticatorFailure(error),
      });
    } catch (_) {
      this.onCreateAuthenticatorFailure(i18n.wallets.errors.invalidPrivateKey);
    }
    // if()
    // const { name, entropy } = { name: 'wallet_aut', entropy: '8e14a1b168adbd256f00753f4ef4fa2b' };
  };

  render() {
    return (
      <ScreenTemplate
        footer={
          <>
            <Button onPress={this.scanQRCode} title={i18n.wallets.publicKey.scan} />
            {/* <FlatButton
              // onPress={this.navigateToImportWallet}
              containerStyle={styles.importButtonContainer}
              title={i18n.authenticators.import.title}
            /> */}
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.authenticators.add.subtitle}</Text>
        <Text style={styles.description}>{i18n.authenticators.add.description}</Text>
      </ScreenTemplate>
    );
  }
}
// const mapStateToProps = (state: ApplicationState) => ({
//   appSettings: state.appSettings,
// });

const mapDispatchToProps: ActionProps = {
  createAuthenticator: actions.createAuthenticator,
};

export default connect(null, mapDispatchToProps)(CreateAuthenticatorScreen);

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
