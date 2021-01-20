import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Alert, View } from 'react-native';
import { connect } from 'react-redux';

import { icons } from 'app/assets';
import { ScreenTemplate, Text, InputItem, Header, Button, FlatButton, RadioButton, Image } from 'app/components';
import {
  Route,
  Wallet,
  MainTabNavigatorParams,
  MainCardStackNavigatorParams,
  ActionMeta,
  CONST,
  WalletType,
  ConfirmAddressFlowType,
} from 'app/consts';
import { maxWalletNameLength } from 'app/consts/text';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { isAfterAirdrop } from 'app/helpers/airdrop';
import {
  HDSegwitBech32Wallet,
  HDSegwitP2SHWallet,
  SegwitP2SHWallet,
  HDSegwitP2SHArWallet,
  HDSegwitP2SHAirWallet,
} from 'app/legacy';
import { ApplicationState } from 'app/state';
import { AppSettingsState } from 'app/state/appSettings/reducer';
import { isNotificationEmailSet, email } from 'app/state/notifications/selectors';
import { selectors as walletsSelector } from 'app/state/wallets';
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
  isNotificationEmailSet: boolean;
  email: string;
}

interface State {
  label: string;
  WalletClass: WalletType;
}

export class CreateWalletScreen extends React.PureComponent<Props, State> {
  state: State = {
    label: '',
    WalletClass: HDSegwitP2SHAirWallet,
  };

  onSelect = (selectedWallet: WalletType) => this.setState({ WalletClass: selectedWallet });

  setLabel = (label: string) => this.setState({ label: label.trim() });

  navigateToImportWallet = () => this.props.navigation.navigate(Route.ImportWalletChooseType);

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
    const { navigation, createWallet, isNotificationEmailSet, email } = this.props;
    wallet.setLabel(label || i18n.wallets.details.title);
    createWallet(wallet, {
      onSuccess: (w: Wallet) => {
        navigation.navigate(Route.CreateWalletSuccess, {
          secret: w.getSecret(),
          onButtonPress: isNotificationEmailSet
            ? () =>
                this.props.navigation.navigate(Route.ReceiveNotificationsConfirmation, {
                  address: email, // TODO
                  flowType: ConfirmAddressFlowType.RECEIVE_NOTIFICATIONS_CONFIRMATION_IMPORT,
                })
            : undefined, // TODO in create wallet logic
        });
      },
      onFailure: () => onError(),
    });
  };

  // TODO: interface Wallet isn't compatible with all wallet classes thus any must stay here for now
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
      description: i18n.wallets.publicKey.instantDescription,
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
      description: i18n.wallets.publicKey.recoveryDescription,
      onBackArrow: () => {
        navigation.navigate(Route.CreateWallet);
      },
    });
  };

  setupWallet = () => {
    const { WalletClass } = this.state;

    if (WalletClass === HDSegwitP2SHAirWallet) {
      return this.navigateToIntegrateInstantPublicKeyForAIR();
    }

    if (WalletClass === HDSegwitP2SHArWallet) {
      return this.navigateToIntegrateRecoveryPublicKeyForAR();
    }

    this.createWallet();
  };

  createWallet = async () => {
    const { navigation } = this.props;
    const { WalletClass } = this.state;

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

    const isNotAfterAirdrop = !isAfterAirdrop();

    return (
      <>
        <Text style={styles.advancedOptionsLabel}>{i18n.wallets.add.walletType}</Text>
        <RadioButton
          testID="create-2-key-vault-radio"
          title={HDSegwitP2SHArWallet.typeReadable}
          subtitle={i18n.wallets.add.ar}
          value={HDSegwitP2SHArWallet}
          checked={this.state.WalletClass === HDSegwitP2SHArWallet}
          onPress={this.onSelect}
        />
        <View style={isNotAfterAirdrop && styles.frame}>
          <RadioButton
            testID="create-3-key-vault-radio"
            title={HDSegwitP2SHAirWallet.typeReadable}
            subtitle={i18n.wallets.add.air}
            value={HDSegwitP2SHAirWallet}
            checked={this.state.WalletClass === HDSegwitP2SHAirWallet}
            onPress={this.onSelect}
          />
          {isNotAfterAirdrop && <Image source={icons.airdrop} style={styles.airdropIcon} />}
        </View>
        <RadioButton
          testID="create-hd-p2sh-radio"
          title={isAdvancedOptionsEnabled ? i18n.wallets.add.legacyHDP2SHTitle : i18n.wallets.add.legacyTitle}
          subtitle={isAdvancedOptionsEnabled ? i18n.wallets.add.legacyHDP2SH : i18n.wallets.add.legacy}
          value={HDSegwitP2SHWallet}
          checked={this.state.WalletClass === HDSegwitP2SHWallet}
          onPress={this.onSelect}
        />
        {isAdvancedOptionsEnabled && (
          <>
            <RadioButton
              testID="create-segwit-p2sh-radio"
              title={i18n.wallets.add.legacyP2SHTitle}
              subtitle={i18n.wallets.add.LegacyP2SH}
              value={SegwitP2SHWallet}
              checked={this.state.WalletClass === SegwitP2SHWallet}
              onPress={this.onSelect}
            />
            <RadioButton
              testID="create-hd-segwit-p2sh-radio"
              title={i18n.wallets.add.legacyHDSegWitTitle}
              subtitle={i18n.wallets.add.LegacyHDSegWit}
              value={HDSegwitBech32Wallet}
              checked={this.state.WalletClass === HDSegwitBech32Wallet}
              onPress={this.onSelect}
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
              testID="create-wallet-button"
            />
            <FlatButton
              onPress={this.navigateToImportWallet}
              containerStyle={styles.importButtonContainer}
              title={i18n.wallets.add.importWalletButton}
              testID="import-wallet-button"
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
          testID="create-wallet-name-input"
        />
        {this.renderAdvancedSection()}
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  appSettings: state.appSettings,
  walletsLabels: walletsSelector.getWalletsLabels(state),
  isNotificationEmailSet: isNotificationEmailSet(state),
  email: email(state),
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
  importButtonContainer: {
    marginTop: 12,
  },
  frame: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderColor: palette.secondary,
    position: 'relative',
  },
  airdropIcon: {
    width: 13,
    height: 12,
    position: 'absolute',
    right: 7,
    top: 7,
  },
});
