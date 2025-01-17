import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { compose } from 'lodash/fp';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Header, TextAreaItem, FlatButton, ScreenTemplate, InputItem, CheckBox } from 'app/components';
import { Button } from 'app/components/Button';
import {
  Route,
  Wallet,
  RootStackParams,
  ActionMeta,
  ELECTRUM_VAULT_SEED_PREFIXES,
  CONST,
  ConfirmAddressFlowType,
} from 'app/consts';
import { maxWalletNameLength } from 'app/consts/text';
import { CreateMessage, MessageType } from 'app/helpers/MessageCreator';
import { withCheckNetworkConnection, CheckNetworkConnectionCallback } from 'app/hocs';
import { preventScreenshots, allowScreenshots } from 'app/services/ScreenshotsService';
import { ApplicationState } from 'app/state';
import {
  checkSubscription,
  CheckSubscriptionAction,
  subscribeWallet as subscribeWalletAction,
  subscribeDeviceToken as subscribeDeviceTokenAction,
  SubscribeWalletActionCreator,
} from 'app/state/notifications/actions';
import { isNotificationEmailSet, storedEmail, readableError } from 'app/state/notifications/selectors';
import { selectors as walletsSelectors } from 'app/state/wallets';
import { importWallet as importWalletAction, ImportWalletAction } from 'app/state/wallets/actions';
import { typography, palette } from 'app/styles';

import {
  SegwitP2SHWallet,
  LegacyWallet,
  WatchOnlyWallet,
  HDSegwitP2SHWallet,
  HDLegacyP2PKHWallet,
  HDSegwitP2SHArWallet,
  HDSegwitBech32Wallet,
  HDSegwitP2SHAirWallet,
} from '../../class';
import { isElectrumVaultMnemonic } from '../../utils/crypto';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<RootStackParams, Route.ImportWallet>;
  route: RouteProp<RootStackParams, Route.ImportWallet>;
  importWallet: (wallet: Wallet, meta?: ActionMeta) => ImportWalletAction;
  wallets: Wallet[];
  isNotificationEmailSet: boolean;
  email: string;
  subscribeFcmToken: (wallet: Wallet[]) => void;
  subscribe: SubscribeWalletActionCreator;
  error: string;
  checkNetworkConnection: (callback: CheckNetworkConnectionCallback) => void;
  checkSubscription: (wallets: Wallet[], email: string, meta?: ActionMeta) => CheckSubscriptionAction;
}

interface State {
  text: string;
  label: string;
  validationError: string;
  hasCustomWords: boolean;
  customWords: string;
}

export class ImportWalletScreen extends Component<Props, State> {
  state = {
    hasCustomWords: false,
    text: '',
    customWords: '',
    label: '',
    validationError: '',
  };

  componentDidMount() {
    preventScreenshots();
  }

  componentWillUnmount() {
    allowScreenshots();
  }

  setCustomWords = (customWords: string) => this.setState({ customWords });

  toggleHasCustomWords = () => this.setState({ hasCustomWords: !this.state.hasCustomWords });

  showErrorMessageScreen = ({
    title = i18n.message.somethingWentWrong,
    description = i18n.message.somethingWentWrongWhileCreatingWallet,
    onPress = () => this.props.navigation.navigate(Route.ImportWalletChooseType, { error: true }),
    buttonTitle = i18n.message.returnToWalletChoose,
  }: {
    title?: string;
    description?: string;
    onPress?: () => void;
    buttonTitle?: string;
  }) =>
    CreateMessage({
      title,
      description,
      type: MessageType.error,
      buttonProps: {
        title: buttonTitle,
        onPress,
      },
    });

  showSuccessImportMessageScreen = (wallet?: Wallet) => {
    if (wallet) {
      this.props.subscribeFcmToken([wallet]);
    }

    CreateMessage({
      title: i18n.message.hooray,
      description: i18n.message.successfullWalletImport,
      type: MessageType.success,
      buttonProps: {
        title: i18n.message.returnToDashboard,
        onPress: () => {
          this.props.navigation.navigate(Route.MainTabStackNavigator, { screen: Route.Dashboard });
        },
      },
    });
  };

  onImportButtonPress = () => {
    Keyboard.dismiss();
    this.importMnemonic(this.state.text);
  };

  onChangeText = (mnemonic: string) => {
    this.setState({ text: mnemonic });
  };

  onLabelChange = (value: string) => {
    const { wallets } = this.props;
    const walletInUse = wallets.some(w => w.label === value);
    const allWalletsCheck =
      value.toLowerCase() === i18n.wallets.dashboard.allWallets.toLowerCase() || this.state.label === CONST.allWallets;
    const validationError =
      walletInUse || allWalletsCheck
        ? walletInUse
          ? i18n.wallets.importWallet.walletInUseValidationError
          : i18n.wallets.importWallet.allWalletsValidationError
        : '';

    this.setState({
      label: value,
      validationError,
    });
  };

  onScanQrCodeButtonPress = () => {
    return this.props.navigation.navigate(Route.ScanQrCode, {
      onBarCodeScan: (mnemonic: string) => this.setState({ text: mnemonic }),
    });
  };

  renderConfirmScreenContent = () => (
    <>
      <Text style={styles.notificationTitle}>{i18n.notifications.getNotification}</Text>
      <Text style={styles.notificationDescription}>
        {i18n.notifications.receiveTransactionDescription}
        <Text style={styles.boldedText}>{this.props.email}</Text>
      </Text>
      <Text style={[styles.notificationDescription, styles.note]}>
        <Text style={styles.boldedText}>{i18n.notifications.noteFirst}</Text>
        {i18n.notifications.noteSecond}
      </Text>
    </>
  );

  navigateToConfirmEmailSubscription = (wallet: Wallet) => {
    const { navigation, email } = this.props;

    navigation.navigate(Route.Confirm, {
      title: i18n.notifications.notifications,
      children: this.renderConfirmScreenContent(),
      gestureEnabled: false,
      onConfirm: () => {
        this.props.subscribe([wallet], email);
        navigation.navigate(Route.ConfirmEmail, {
          email,
          flowType: ConfirmAddressFlowType.SUBSCRIBE,
          wallets: [wallet],
          onSuccess: () => this.showSuccessImportMessageScreen(wallet),
          onResend: () => this.props.subscribe([wallet], email),
        });
      },

      onBack: () => this.showSuccessImportMessageScreen(),
      isBackArrow: false,
    });
  };

  importWallet = (wallet: Wallet, onSuccess: () => void) => {
    const { importWallet } = this.props;

    importWallet(wallet, {
      onSuccess,
      onFailure: (error: string) =>
        this.showErrorMessageScreen({
          description: error,
        }),
    });
  };

  saveWallet = async (newWallet: any) => {
    const { wallets, email, checkSubscription } = this.props;

    if (wallets.some(wallet => wallet.secret === newWallet.secret)) {
      return this.showErrorMessageScreen({
        title: i18n.wallets.importWallet.walletInUseValidationError,
        description: i18n.wallets.importWallet.walletInUseValidationError,
        onPress: () => this.navigateToImportWallet(),
        buttonTitle: i18n.message.returnToWalletImport,
      });
    }
    newWallet.setLabel(this.state.label);

    this.importWallet(newWallet, () => {
      if (email) {
        return checkSubscription([newWallet], email, {
          onSuccess: (ids: string[]) => {
            const isWalletSubscribed = ids.some(id => id === newWallet.id);

            isWalletSubscribed
              ? this.showSuccessImportMessageScreen(newWallet)
              : this.navigateToConfirmEmailSubscription(newWallet);
          },
          onFailure: () => {
            this.showSuccessImportMessageScreen();
          },
        });
      }
      this.showSuccessImportMessageScreen();
    });
  };

  showAlert = (error: string) => {
    Alert.alert('Error', error, [
      {
        text: 'OK',
      },
    ]);
  };

  createWalletMessage = (asyncTask: () => void) => {
    CreateMessage({
      title: i18n.message.creatingWallet,
      description: i18n.message.creatingWalletDescription,
      type: MessageType.processingState,
      asyncTask,
    });
  };

  createARWallet = (mnemonic: string) => {
    try {
      const wallet = new HDSegwitP2SHArWallet();

      wallet.setMnemonic(mnemonic);
      this.props.navigation.navigate(Route.IntegrateKey, {
        onBarCodeScan: (key: string) => {
          try {
            wallet.addPublicKey(key);
            this.createWalletMessage(() => {
              this.saveVaultWallet(wallet);
            });
          } catch (e) {
            if (e instanceof Error) {
              this.showAlert(e.message);
            }
          }
        },
        headerTitle: i18n.wallets.importWallet.header,
        title: i18n.wallets.importWallet.scanCancelPubKey,
        description: i18n.wallets.importWallet.scanPublicKeyDescription,
        withLink: false,
      });
    } catch (e) {
      if (e instanceof Error) {
        this.showAlert(e.message);
      }
    }
  };

  navigateToImportWallet = () => {
    const { navigation, route } = this.props;

    navigation.navigate(Route.ImportWallet, { walletType: route.params.walletType });
  };

  addRecoveryPublicKey = (wallet: HDSegwitP2SHAirWallet) => {
    this.props.navigation.navigate(Route.IntegrateKey, {
      onBarCodeScan: (recoveryPublicKey: string) => {
        try {
          wallet.addPublicKey(recoveryPublicKey);
          this.createWalletMessage(() => {
            this.saveVaultWallet(wallet);
          });
        } catch (error) {
          if (error instanceof Error) {
            this.showAlert(error.message);
          }
        }
      },
      headerTitle: i18n.wallets.importWallet.header,
      title: i18n.wallets.importWallet.scanCancelPubKey,
      description: i18n.wallets.importWallet.scanPublicKeyDescription,
      withLink: false,
      onBackArrow: () => {
        wallet.clearPublickKeys();
        this.addInstantPublicKey(wallet);
      },
    });
  };

  createAIRWallet = (mnemonic: string) => {
    try {
      const wallet = new HDSegwitP2SHAirWallet();

      wallet.setMnemonic(mnemonic);
      this.addInstantPublicKey(wallet);
    } catch (e) {
      if (e instanceof Error) {
        this.showAlert(e.message);
      }
    }
  };

  isValidVaultWallet = async (wallet: HDSegwitP2SHArWallet | HDSegwitP2SHAirWallet) => {
    if (!wallet.validateMnemonic()) {
      return false;
    }
    await wallet.generateAddresses();
    await wallet.fetchTransactions();
    return wallet.getTransactions().length !== 0;
  };

  saveVaultWallet = async (wallet: HDSegwitP2SHArWallet | HDSegwitP2SHAirWallet) => {
    try {
      const { customWords, hasCustomWords } = this.state;
      const trimmedCustomWords = customWords.trim();

      if (hasCustomWords) {
        wallet.setPassword(trimmedCustomWords);
      }

      if (await this.isValidVaultWallet(wallet)) {
        return this.saveWallet(wallet);
      }

      wallet.resetAddressesGeneration();
      wallet.setIsElectrumVault(true);
      if (await this.isValidVaultWallet(wallet)) {
        return this.saveWallet(wallet);
      }

      this.showErrorMessageScreen({
        title: i18n.message.noTransactions,
        description: i18n.message.noTransactionsDesc,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.showErrorMessageScreen({
          title: i18n.message.generateAddressesError,
          description: error.message,
        });
      }
    }
  };

  renderSubtitle = () => (
    <>
      <View style={styles.arSubtitleContainer}>
        <Text style={styles.subtitle}>{i18n.wallets.importWallet.importARDescription1}</Text>
        <Text style={styles.subtitle}>{i18n._.or}</Text>
        <Text style={styles.subtitle}>{i18n.wallets.importWallet.importARDescription2}</Text>
      </View>
      <InputItem
        testID="import-wallet-name"
        error={this.state.validationError}
        setValue={this.onLabelChange}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        label={i18n.wallets.add.inputLabel}
        maxLength={maxWalletNameLength}
      />
    </>
  );

  addInstantPublicKey = (wallet: HDSegwitP2SHAirWallet) => {
    this.props.navigation.navigate(Route.IntegrateKey, {
      onBarCodeScan: (instantPublicKey: string) => {
        try {
          wallet.addPublicKey(instantPublicKey);
          this.addRecoveryPublicKey(wallet);
        } catch (e) {
          if (e instanceof Error) {
            this.showAlert(e.message);
          }
        }
      },
      withLink: false,
      headerTitle: i18n.wallets.importWallet.header,
      title: i18n.wallets.importWallet.scanFastPubKey,
      description: i18n.wallets.importWallet.scanPublicKeyDescription,
      onBackArrow: () => {
        this.navigateToImportWallet();
      },
    });
  };

  importLegacyWallet = async (trimmedMnemonic: string) => {
    const { customWords, hasCustomWords } = this.state;
    const trimmedCustomWords = customWords.trim();

    try {
      if (isElectrumVaultMnemonic(trimmedMnemonic, ELECTRUM_VAULT_SEED_PREFIXES.SEED_PREFIX_SW)) {
        const electrumHDSegwitBech32Wallet = new HDSegwitBech32Wallet({ isElectrumVault: true });

        if (hasCustomWords) {
          electrumHDSegwitBech32Wallet.setPassword(trimmedCustomWords);
        }
        await electrumHDSegwitBech32Wallet.setSecret(trimmedMnemonic);
        await electrumHDSegwitBech32Wallet.fetchTransactions();
        if (electrumHDSegwitBech32Wallet.getTransactions().length > 0) {
          return this.saveWallet(electrumHDSegwitBech32Wallet);
        }
      }

      const segwitWallet = new SegwitP2SHWallet();

      segwitWallet.setSecret(trimmedMnemonic);
      if (segwitWallet.getAddress()) {
        // ok its a valid WIF
        await segwitWallet.fetchTransactions();
        if (segwitWallet.getTransactions().length !== 0) {
          return this.saveWallet(segwitWallet);
        }
      }

      // case - WIF is valid, just has uncompressed pubkey

      const legacyWallet = new LegacyWallet();

      legacyWallet.setSecret(trimmedMnemonic);
      if (legacyWallet.getAddress()) {
        await legacyWallet.fetchTransactions();
        if (legacyWallet.getTransactions().length !== 0) {
          return this.saveWallet(legacyWallet);
        }
      }

      // if we're here - nope, its not a valid WIF

      const hdSegwitP2SH = new HDSegwitP2SHWallet();

      await hdSegwitP2SH.setSecret(trimmedMnemonic);
      if (hdSegwitP2SH.validateMnemonic()) {
        await hdSegwitP2SH.fetchTransactions();
        if (hdSegwitP2SH.getTransactions().length !== 0) {
          return this.saveWallet(hdSegwitP2SH);
        }
      }

      const hdSegwitBech32 = new HDSegwitBech32Wallet();

      await hdSegwitBech32.setSecret(trimmedMnemonic);
      if (hdSegwitBech32.validateMnemonic()) {
        await hdSegwitBech32.fetchTransactions();
        if (hdSegwitBech32.getTransactions().length !== 0) {
          return this.saveWallet(hdSegwitBech32);
        }
      }

      const hdLegactP2PKH = new HDLegacyP2PKHWallet();

      if (hasCustomWords) {
        hdLegactP2PKH.setPassword(trimmedCustomWords);
      }
      await hdLegactP2PKH.setSecret(trimmedMnemonic);

      if (hdLegactP2PKH.validateMnemonic()) {
        await hdLegactP2PKH.fetchTransactions();
        if (hdLegactP2PKH.getTransactions().length !== 0) {
          return this.saveWallet(hdLegactP2PKH);
        }
      }

      const watchOnly = new WatchOnlyWallet();

      watchOnly.setSecret(trimmedMnemonic);
      if (watchOnly.valid()) {
        await watchOnly.fetchTransactions();
        if (watchOnly.getTransactions().length !== 0) {
          return this.saveWallet(watchOnly);
        }
      }

      // TODO: try a raw private key
    } catch (e) {
      if (e instanceof Error) {
        this.showErrorMessageScreen({ description: e.message });
      }
    }
    this.showErrorMessageScreen({
      title: i18n.message.wrongMnemonic,
      description: i18n.message.wrongMnemonicDesc,
    });
    // ReactNativeHapticFeedback.trigger('notificationError', {
    //   ignoreAndroidSystemSettings: false,
    // });
    // Plan:
    // 0. check if its HDSegwitBech32Wallet (BIP84)
    // 1. check if its HDSegwitP2SHWallet (BIP49)
    // 2. check if its HDLegacyP2PKHWallet (BIP44)
    // 3. check if its HDLegacyBreadwalletWallet (no BIP, just "m/0")
    // 4. check if its Segwit WIF (P2SH)
    // 5. check if its Legacy WIF
    // 6. check if its address (watch-only wallet)
    // 7. check if its private key (segwit address P2SH) TODO
    // 7. check if its private key (legacy address) TODO
  };

  importMnemonic = (mnemonic: string) => {
    const trimmedMnemonic = mnemonic.trim().replace(/ +/g, ' ');

    if (this.props?.route.params.walletType === '2-Key Vault') {
      return this.createARWallet(trimmedMnemonic);
    }

    if (this.props?.route.params.walletType === '3-Key Vault') {
      return this.createAIRWallet(trimmedMnemonic);
    }

    this.createWalletMessage(() => {
      this.importLegacyWallet(trimmedMnemonic);
    });
  };

  executeWithNetworkConnectionCheck = (callback: () => void) => () => {
    const { checkNetworkConnection } = this.props;

    checkNetworkConnection(() => callback());
  };

  render() {
    const { validationError, text, label, hasCustomWords, customWords } = this.state;

    return (
      <ScreenTemplate
        keyboardShouldPersistTaps={'always'}
        footer={
          <>
            <Button
              testID="submit-import-wallet-button"
              disabled={!text || !!validationError || !label}
              title={i18n.wallets.importWallet.import}
              onPress={this.executeWithNetworkConnectionCheck(this.onImportButtonPress)}
            />
            <FlatButton
              testID="scan-import-wallet-qr-code-button"
              containerStyle={styles.scanQRCodeButtonContainer}
              title={i18n.wallets.importWallet.scanQrCode}
              onPress={this.executeWithNetworkConnectionCheck(this.onScanQrCodeButtonPress)}
            />
          </>
        }
        header={<Header isBackArrow={true} title={i18n.wallets.importWallet.header} />}
      >
        <View style={styles.inputItemContainer}>
          <Text style={styles.title}>{i18n.wallets.importWallet.title}</Text>
          {this.renderSubtitle()}
          <TextAreaItem
            testID="import-wallet-seed-phrase-input"
            error={validationError}
            autoCapitalize="none"
            value={text}
            onChangeText={this.onChangeText}
            placeholder={i18n.wallets.importWallet.placeholder}
            style={styles.textArea}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              onPress={this.toggleHasCustomWords}
              containerStyle={styles.checkbox}
              left
              checked={hasCustomWords}
              title={<Text style={styles.checkboxText}>{i18n.wallets.importWallet.extendWithCustomWords}</Text>}
            />
          </View>
          {hasCustomWords && (
            <TextAreaItem
              value={customWords}
              autoCapitalize="none"
              onChangeText={this.setCustomWords}
              placeholder={i18n.wallets.importWallet.customWords}
              style={styles.textAreaCustomWords}
            />
          )}
        </View>
      </ScreenTemplate>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  wallets: walletsSelectors.wallets(state),
  isNotificationEmailSet: isNotificationEmailSet(state),
  email: storedEmail(state),
  error: readableError(state),
});

const mapDispatchToProps = {
  importWallet: importWalletAction,
  checkSubscription,
  subscribe: subscribeWalletAction,
  subscribeFcmToken: subscribeDeviceTokenAction,
};

export default compose(withCheckNetworkConnection, connect(mapStateToProps, mapDispatchToProps))(ImportWalletScreen);

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 2,
  },
  checkbox: {
    marginLeft: -12,
    backgroundColor: palette.white,
    borderWidth: 0,
  },
  checkboxText: {
    paddingLeft: 20,
  },
  inputItemContainer: {
    paddingTop: 16,
    width: '100%',
    flexGrow: 1,
  },
  textAreaCustomWords: {
    marginTop: 24,
    height: 160,
    marginBottom: 24,
  },
  title: {
    ...typography.headline4,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    color: palette.textGrey,
    paddingTop: 18,
    textAlign: 'center',
  },
  textArea: {
    marginTop: 24,
    height: 250,
  },
  scanQRCodeButtonContainer: {
    marginTop: 12,
  },
  arSubtitleContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  notificationDescription: {
    ...typography.caption,
    color: palette.textGrey,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 18,
  },
  boldedText: {
    ...typography.headline9,
    color: palette.textBlack,
  },
  note: {
    marginTop: 42,
  },
  notificationTitle: { ...typography.headline4, marginTop: 16, textAlign: 'center' },
});
