import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import { ScreenTemplate, Text, InputItem, Header, Button, FlatButton, RadioButton } from 'app/components';
import { Route, Wallet, MainTabNavigatorParams, MainCardStackNavigatorParams, ActionMeta, CONST, WalletType } from 'app/consts';
import { maxWalletNameLength } from 'app/consts/text';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import {
  HDSegwitBech32Wallet,
  HDSegwitP2SHWallet,
  SegwitP2SHWallet,
  HDSegwitP2SHArWallet,
  HDSegwitP2SHAirWallet,
} from 'app/legacy';
import { ApplicationState } from 'app/state';
import { AppSettingsState } from 'app/state/appSettings/reducer';
import { selectors } from 'app/state/wallets';
import { createWallet as createWalletAction, CreateWalletAction } from 'app/state/wallets/actions';
import { palette, typography } from 'app/styles';

const i18n = require('../../loc');

interface Props {
  navigation: CompositeNavigationProp<
    StackNavigationProp<MainCardStackNavigatorParams, Route.CreateContact>,
    CompositeNavigationProp<
      StackNavigationProp<MainTabNavigatorParams, Route.Dashboard>,
      StackNavigationProp<MainCardStackNavigatorParams, Route.CreateWallet>
    >
  >;
  route: RouteProp<MainCardStackNavigatorParams, Route.CreateWallet>;
  appSettings: AppSettingsState;
  createWallet: (wallet: Wallet, meta?: ActionMeta) => CreateWalletAction;
  walletsLabels: string[];
}
interface State {
  label: string;
  selectedType: WalletType;
}

export class CreateWalletScreen extends React.PureComponent<Props, State> {
  state: State = {
    label: '',
    selectedType: '2-Key Vault',
  };

  onSelect = (type: WalletType) => this.setState({ selectedType: type });

  setLabel = (label: string) => this.setState({ label: label.trim() });

  navigateToImportWallet = () => this.props.navigation.navigate(Route.ImportWalletChooseType);

  // TODO: Replace any with the proper interface
  walletClassMap: { [key in WalletType]: any } = {
    '3-Key Vault': HDSegwitP2SHAirWallet,
    '2-Key Vault': HDSegwitP2SHArWallet,
    'Standard HD P2SH': HDSegwitBech32Wallet,
    'Standard P2SH': SegwitP2SHWallet,
    'Standard HD SegWit': HDSegwitP2SHWallet,
  };

  createARWallet = (recoveryPublicKey: string) => {
    const { navigation } = this.props;

    const onError = () => this.showAlert(() => this.navigateToIntegrateRecoveryPublicKeyForAR());
    try {
      const wallet = new HDSegwitP2SHArWallet([recoveryPublicKey]);
      navigation.goBack();
      this.createWalletMessage(wallet, onError);
    } catch (_) {
      onError();
    }
  };

  showAlert = (onPress: Function, error?: string) => {
    Alert.alert('Error', error || i18n.wallets.add.publicKeyError, [
      {
        text: 'OK',
        onPress: () => onPress(),
      },
    ]);
  };

  generateWallet = (wallet: Wallet, onError: Function) => {
    const { label } = this.state;
    const { navigation, createWallet } = this.props;
    wallet.setLabel(label || i18n.wallets.details.title);
    createWallet(wallet, {
      onSuccess: (w: Wallet) => {
        navigation.navigate(Route.CreateWalletSuccess, {
          secret: w.getSecret(),
        });
      },
      onFailure: () => onError(),
    });
  };

  createWalletMessage = (wallet: any, onError: Function) => {
    CreateMessage({
      title: i18n.message.creatingWallet,
      description: i18n.message.creatingWalletDescription,
      type: MessageType.processingState,
      asyncTask: () => this.generateWallet(wallet, onError),
    });
  };

  createAIRWalletAddRecoveryPublicKey = (wallet: HDSegwitP2SHAirWallet) => (recoveryPublicKey: string) => {
    const { navigation } = this.props;

    const onError = (error: string) =>
      this.showAlert(() => {
        this.navigateToIntegrateRecoveryPublicKeyForAIR(wallet);
      }, error);
    try {
      wallet.addPublicKey(recoveryPublicKey);
      navigation.goBack();
      this.createWalletMessage(wallet, onError);
    } catch (e) {
      onError(e.message);
    }
  };

  navigateToIntegrateRecoveryPublicKeyForAIR = (wallet: HDSegwitP2SHAirWallet) => {
    const { navigation } = this.props;

    navigation.navigate(Route.IntegrateKey, {
      onBarCodeScan: this.createAIRWalletAddRecoveryPublicKey(wallet),
      headerTitle: i18n.wallets.add.title,
      title: i18n.wallets.publicKey.recoverySubtitle,
      description: i18n.wallets.publicKey.recoveryDescription,
      onBackArrow: () => {
        this.navigateToIntegrateInstantPublicKeyForAIR();
      },
    });
  };

  navigateToIntegrateRecoveryPublicKeyForAR = () => {
    const { navigation } = this.props;
    navigation.navigate(Route.IntegrateKey, {
      onBarCodeScan: recoveryPublicKey => this.createARWallet(recoveryPublicKey),
      headerTitle: i18n.wallets.add.title,
      title: i18n.wallets.publicKey.recoverySubtitle,
      description: i18n.wallets.publicKey.recoveryDescription,
      onBackArrow: () => {
        navigation.navigate(Route.CreateWallet);
      },
    });
  };

  navigateToIntegrateInstantPublicKeyForAIR = () => {
    const { navigation } = this.props;
    const wallet = new HDSegwitP2SHAirWallet();
    navigation.navigate(Route.IntegrateKey, {
      onBarCodeScan: instantPublicKey => {
        try {
          wallet.addPublicKey(instantPublicKey);
          this.navigateToIntegrateRecoveryPublicKeyForAIR(wallet);
        } catch (e) {
          this.showAlert(() => this.navigateToIntegrateInstantPublicKeyForAIR(), e.message);
        }
      },
      title: i18n.wallets.publicKey.instantSubtitle,
      headerTitle: i18n.wallets.add.title,
      description: i18n.wallets.publicKey.instantDescription,
      onBackArrow: () => {
        navigation.navigate(Route.CreateWallet);
      },
    });
  };

  setupWallet = () => {
    const { selectedType: selectedWalletType } = this.state;

    if (selectedWalletType === '3-Key Vault') {
      return this.navigateToIntegrateInstantPublicKeyForAIR();
    }

    if (selectedWalletType === '2-Key Vault') {
      return this.navigateToIntegrateRecoveryPublicKeyForAR();
    }

    this.createWallet();
  };

  createWallet = async () => {
    const { navigation } = this.props;
    const { selectedType: selectedWalletType } = this.state;
    const WalletClass = this.walletClassMap[selectedWalletType] || HDSegwitBech32Wallet;

    const wallet = new WalletClass();

    const onError = () =>
      this.showAlert(() => {
        navigation.navigate(Route.CreateWallet);
      }, i18n.wallets.add.failed);
    this.createWalletMessage(wallet, onError);
  };

  get canCreateWallet(): boolean {
    return !!this.state.label && !this.validationError;
  }

  get validationError(): string | undefined {
    const { walletsLabels } = this.props;
    if (walletsLabels.includes(this.state.label.trim())) {
      return i18n.wallets.importWallet.walletInUseValidationError;
    }
    if (
      this.state.label.toLowerCase() === i18n.wallets.dashboard.allWallets.toLowerCase() ||
      this.state.label === CONST.allWallets
    ) {
      return i18n.wallets.importWallet.allWalletsValidationError;
    }
  }

  renderAdvancedSection() {
    const { isAdvancedOptionsEnabled } = this.props.appSettings;

    return (
      <>
        <Text style={styles.advancedOptionsLabel}>{i18n.wallets.add.walletType}</Text>

        {!isAdvancedOptionsEnabled ? (
          <>
            <RadioButton
              title={HDSegwitP2SHArWallet.typeReadable}
              subtitle={i18n.wallets.add.ar}
              value={'2-Key Vault'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={HDSegwitP2SHAirWallet.typeReadable}
              subtitle={i18n.wallets.add.air}
              value={'3-Key Vault'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={i18n.wallets.add.legacyTitle}
              subtitle={i18n.wallets.add.legacy}
              value={'Standard HD P2SH'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
          </>
        ) : (
          <>
            <RadioButton
              title={HDSegwitP2SHArWallet.typeReadable}
              subtitle={i18n.wallets.add.ar}
              value={'2-Key Vault'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={HDSegwitP2SHAirWallet.typeReadable}
              subtitle={i18n.wallets.add.air}
              value={'3-Key Vault'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={i18n.wallets.add.legacyHDP2SHTitle}
              subtitle={i18n.wallets.add.legacyHDP2SH}
              value={'Standard HD P2SH'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={i18n.wallets.add.legacyP2SHTitle}
              subtitle={i18n.wallets.add.LegacyP2SH}
              value={'Standard P2SH'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
            <RadioButton
              title={i18n.wallets.add.legacyHDSegWitTitle}
              subtitle={i18n.wallets.add.LegacyHDSegWit}
              value={'Standard HD SegWit'}
              selectedValue={this.state.selectedType}
              onPress={value => {
                this.onSelect(value);
              }}
            />
          </>
        )}
      </>
    );
  }

  render() {
    return (
      <ScreenTemplate
        footer={
          <>
            <Button
              disabled={!this.canCreateWallet}
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
        header={<Header isBackArrow title={i18n.wallets.add.title} />}
      >
        <Text style={styles.subtitle}>{i18n.wallets.add.subtitle}</Text>
        <Text style={styles.description}>{i18n.wallets.add.description}</Text>
        <InputItem
          error={this.validationError}
          setValue={this.setLabel}
          label={i18n.wallets.add.inputLabel}
          maxLength={maxWalletNameLength}
        />
        {this.renderAdvancedSection()}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  appSettings: state.appSettings,
  walletsLabels: selectors.getWalletsLabels(state),
});

const mapDispatchToProps = {
  createWallet: createWalletAction,
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
    fontSize: 13,
  },
  importButtonContainer: {
    marginTop: 12,
  },
});
