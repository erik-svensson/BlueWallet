import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import { ScreenTemplate, Text, InputItem, Header, Button, FlatButton, RadioGroup, RadioButton } from 'app/components';
import { Route, Wallet } from 'app/consts';
import {
  AppStorage,
  HDSegwitBech32Wallet,
  HDSegwitP2SHWallet,
  SegwitP2SHWallet,
  HDSegwitP2SHArWallet,
  BlueApp,
} from 'app/legacy';
import { ApplicationState } from 'app/state';
import { AppSettingsState } from 'app/state/appSettings/reducer';
import { loadWallets, WalletsActionType } from 'app/state/wallets/actions';
import { palette, typography } from 'app/styles';

import CreateWalletSuccessScreen from './CreateWalletSuccessScreen';

const i18n = require('../../loc');

interface Props extends NavigationInjectedProps {
  appSettings: AppSettingsState;
  loadWallets: () => Promise<WalletsActionType>;
}

interface State {
  label: string;
  isLoading: boolean;
  isSuccess: boolean;
  activeBitcoin: boolean;
  isAdvancedOptionsEnabled: boolean;
  walletBaseURI: string;
  selectedIndex: number;
  secret: string[];
  publicKey: string;
}

export class CreateWalletScreen extends React.PureComponent<Props, State> {
  state: State = {
    label: '',
    isLoading: false,
    isSuccess: false,
    activeBitcoin: false,
    isAdvancedOptionsEnabled: false,
    walletBaseURI: '',
    selectedIndex: 0,
    secret: [],
    publicKey: '',
  };

  static navigationOptions = (props: NavigationScreenProps) => ({
    header: <Header navigation={props.navigation} isBackArrow title={i18n.wallets.add.title} />,
  });

  async componentDidMount() {
    let walletBaseURI = await AsyncStorage.getItem(AppStorage.LNDHUB);
    const { isAdvancedOptionsEnabled } = this.props.appSettings;
    walletBaseURI = walletBaseURI || '';

    this.setState({
      isLoading: false,
      activeBitcoin: true,
      label: '',
      isAdvancedOptionsEnabled,
      walletBaseURI,
    });
  }

  onSelect = (selectedIndex: number) =>
    this.setState({
      selectedIndex,
    });

  setLabel = (label: string) => this.setState({ label });

  navigateToImportWallet = () => this.props.navigation.navigate(Route.ImportWallet);

  getWalletClassByIndex = (index: number) => {
    switch (index) {
      case 2:
        return HDSegwitBech32Wallet;
      case 0:
        return HDSegwitP2SHArWallet;
      case 1:
        return SegwitP2SHWallet;
      default:
        return HDSegwitP2SHWallet;
    }
  };

  setupWallet = () => {
    const { selectedIndex } = this.state;

    if (selectedIndex === 0) {
      return this.props.navigation.navigate(Route.ScanQrCode, {
        onBarCodeScan: (newPublicKey: string) => {
          this.setState(
            {
              publicKey: newPublicKey,
            },
            () => this.createWallet(),
          );
        },
      });
    }
    this.createWallet();
  };

  createWallet = async () => {
    const { selectedIndex, label, publicKey, isLoading } = this.state;
    if (isLoading) return;
    this.setState({ isLoading: true });

    const WalletClass = this.getWalletClassByIndex(selectedIndex);

    try {
      const wallet = publicKey ? new WalletClass([publicKey]) : new WalletClass();

      wallet.setLabel(label || i18n.wallets.details.title);

      if (this.state.activeBitcoin) {
        await wallet.generate();
        BlueApp.wallets.push(wallet);
        await BlueApp.saveToDisk();
        this.props.loadWallets();
        this.setState({ isSuccess: true, secret: wallet.getSecret().split(' ') });
      }
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert(i18n.wallets.add.publicKeyError);
    }
  };

  get canCreateWallet(): boolean {
    return this.state.activeBitcoin && !!this.state.label && !this.validationError;
  }

  get validationError(): string | undefined {
    const walletLabels = BlueApp.getWallets().map((wallet: Wallet) => wallet.label) || [];
    if (walletLabels.includes(this.state.label)) {
      return i18n.wallets.importWallet.walletInUseValidationError;
    }
  }

  renderAdvancedSection() {
    if (this.state.activeBitcoin) {
      return (
        <>
          <Text style={styles.advancedOptionsLabel}>{i18n.wallets.add.walletType}</Text>
          {!this.state.isAdvancedOptionsEnabled ? (
            <RadioGroup color={palette.secondary} onSelect={this.onSelect} selectedIndex={this.state.selectedIndex}>
              <RadioButton style={styles.radioButton} value={SegwitP2SHWallet.type}>
                {/* -> AR */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${HDSegwitP2SHArWallet.typeReadable}`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.ar}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitP2SHWallet.type}>
                {/* -> AIR */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${HDSegwitP2SHWallet.typeReadable} -> AIR`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.air}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitBech32Wallet.type}>
                {/* -> legacy */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${HDSegwitBech32Wallet.typeReadable} -> legacy`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.legacy}</Text>
                </View>
              </RadioButton>
            </RadioGroup>
          ) : (
            <RadioGroup color={palette.secondary} onSelect={this.onSelect} selectedIndex={this.state.selectedIndex}>
              <RadioButton style={styles.radioButton} value={SegwitP2SHWallet.type}>
                {/* -> AR */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${SegwitP2SHWallet.typeReadable} -> AR`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.ar}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitP2SHWallet.type}>
                {/* -> AIR */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${HDSegwitP2SHWallet.typeReadable} -> AIR`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.air}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitBech32Wallet.type}>
                {/* -> legacyHDP2SH */}
                <View style={styles.radioButtonContent}>
                  <Text
                    style={styles.radioButtonTitle}
                  >{`${HDSegwitBech32Wallet.typeReadable} -> Legacy HD P2SH`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.legacyHDP2SH}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitBech32Wallet.type}>
                {/* -> LegacyP2SH */}
                <View style={styles.radioButtonContent}>
                  <Text style={styles.radioButtonTitle}>{`${HDSegwitBech32Wallet.typeReadable} -> Legacy P2SH`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.LegacyP2SH}</Text>
                </View>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={HDSegwitBech32Wallet.type}>
                {/* -> LegacyHDSegWit */}
                <View style={styles.radioButtonContent}>
                  <Text
                    style={styles.radioButtonTitle}
                  >{`${HDSegwitBech32Wallet.typeReadable} -> Legacy HD SegWit`}</Text>
                  <Text style={styles.radioButtonSubtitle}>{i18n.wallets.add.LegacyHDSegWit}</Text>
                </View>
              </RadioButton>
            </RadioGroup>
          )}
        </>
      );
    }
  }

  render() {
    console.log('render');
    if (this.state.isSuccess) {
      return <CreateWalletSuccessScreen secret={this.state.secret} navigation={this.props.navigation} />;
    }
    return (
      <ScreenTemplate
        footer={
          <>
            {this.state.isLoading && (
              <Text style={styles.isLoadingDescription}>{i18n.message.creatingWalletDescription}</Text>
            )}
            <Button
              disabled={!this.canCreateWallet}
              loading={this.state.isLoading}
              onPress={this.setupWallet}
              title={i18n.wallets.add.addWalletButton}
            />
            <FlatButton
              onPress={this.navigateToImportWallet}
              containerStyle={styles.importButtonContainer}
              title={i18n.wallets.add.importWalletButton}
            />
          </>
        }
      >
        <Text style={styles.subtitle}>{i18n.wallets.add.subtitle}</Text>
        <Text style={styles.description}>{i18n.wallets.add.description}</Text>
        <InputItem error={this.validationError} setValue={this.setLabel} label={i18n.wallets.add.inputLabel} />
        {this.renderAdvancedSection()}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  appSettings: state.appSettings,
});

const mapDispatchToProps = {
  loadWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletScreen);

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
