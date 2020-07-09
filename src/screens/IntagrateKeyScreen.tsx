import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';

import { ScreenTemplate, Text, Header, Button } from 'app/components';
import { Route } from 'app/consts';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { BlueApp } from 'app/legacy';
import { NavigationService } from 'app/services';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

type Props = NavigationInjectedProps;

interface State {
  isLoading: boolean;
}

export class IntagrateKeyScreen extends React.PureComponent<Props, State> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.wallets.add.title} />,
  });

  state: State = {
    isLoading: false,
  };

  scanKey = () => {
    return this.props.navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (newPublicKey: string) => {
        CreateMessage({
          title: i18n.message.creatingWallet,
          description: i18n.message.creatingWalletDescription,
          type: MessageType.processingState,
          asyncTask: () => this.createWallet(newPublicKey),
        });
      },
    });
  };

  createWallet = async (publicKey: string) => {
    const { isLoading } = this.state;
    const { getParam } = this.props.navigation;
    const label = getParam('label');
    const walletClass = getParam('wallet');
    const loadWallets = getParam('loadWallets');

    if (isLoading) return;
    this.setState({ isLoading: true });
    try {
      const wallet = new walletClass([publicKey]);

      wallet.setLabel(label || i18n.wallets.details.title);

      await wallet.generate();
      BlueApp.wallets.push(wallet);
      await BlueApp.saveToDisk();
      loadWallets();
      this.setState({ isLoading: false });

      CreateMessage({
        title: i18n.message.success,
        description: i18n.message.successfullWalletImport,
        type: MessageType.success,
        buttonProps: {
          title: i18n.message.returnToDashboard,
          onPress: () => NavigationService.navigateWithReset(Route.MainCardStackNavigator),
        },
      });
    } catch (error) {
      this.setState({ isLoading: false });

      Alert.alert('Error', i18n.wallets.add.publicKeyError, [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate(Route.MainCardStackNavigator);
          },
        },
      ]);
    }
  };

  render() {
    return (
      <ScreenTemplate
        footer={<Button loading={this.state.isLoading} onPress={this.scanKey} title={i18n.wallets.publicKey.scan} />}
      >
        <Text style={styles.subtitle}>{i18n.wallets.publicKey.subtitle}</Text>
        <Text style={styles.description}>{i18n.wallets.publicKey.description}</Text>
      </ScreenTemplate>
    );
  }
}

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
});
