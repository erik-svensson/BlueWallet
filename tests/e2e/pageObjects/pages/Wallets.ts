import { by, element } from 'detox';

import actions from '../../actions';
import MessageScreen from '../common/MessageScreen';
import ScanQrCodeScreen from '../common/ScanQrCodeScreen';
import { BasicWalletType, WalletType } from '../types';

const Wallets = () => {
  const AddNewWallet = () => {
    const CreateScreen = () => ({
      nameInput: element(by.id('create-wallet-name-input')),
      nameValidationError: element(by.id('create-wallet-name-input-validation-error')),

      walletTypeRadios: {
        '3-Key Vault': element(by.id('create-3-key-vault-radio')),
        '2-Key Vault': element(by.id('create-2-key-vault-radio')),
        'Standard HD P2SH': element(by.id('create-hd-p2sh-radio')),
        'Standard P2SH': element(by.id('create-segwit-p2sh-radio')),
        'Standard HD SegWit': element(by.id('create-hd-segwit-p2sh-radio')),
      },

      createWalletButton: element(by.id('create-wallet-button')),
      importWalletButton: element(by.id('import-wallet-button')),

      async typeName(value: string) {
        await actions.typeText(this.nameInput, value, { closeKeyboard: true });
      },

      async chooseType(type: WalletType) {
        // Note: For some reasons it's required to tap multiple times, it seems keyboard is "opened in headless" or whatever
        await actions.tap(this.walletTypeRadios[type]);
      },

      async tapOnCreateButton() {
        await actions.tap(this.createWalletButton);
      },

      async tapOnImportButton() {
        await actions.tap(this.importWalletButton);
      },
    });

    const AddFastKeyScreen = () => ({
      scanQrCodeButton: element(by.id('scan-public-key-code-button')),

      async tapScanOnQrCode() {
        await actions.tap(this.scanQrCodeButton);
      },
    });

    const AddCancelKeyScreen = () => ({
      scanQrCodeButton: element(by.id('scan-public-key-code-button')),

      async tapScanOnQrCode() {
        await actions.tap(this.scanQrCodeButton);
      },
    });

    const SuccessScreen = () => ({
      closeButton: element(by.id('create-wallet-close-button')),
      mnemonic: element(by.id('create-wallet-mnemonic')),

      async tapOnCloseButton() {
        await actions.tap(this.closeButton);
      },
    });

    return {
      createScreen: CreateScreen(),
      addFastKeyScreen: AddFastKeyScreen(),
      addCancelKeyScreen: AddCancelKeyScreen(),
      scanQrCodeScreen: ScanQrCodeScreen(),
      loadingScreen: MessageScreen('processingState'),
      successScreen: SuccessScreen(),
    };
  };

  const ImportWallet = () => {
    const ChooseWalletTypeScreen = () => ({
      walletTypeRadios: {
        '3-Key Vault': element(by.id('import-3-key-vault-radio')),
        '2-Key Vault': element(by.id('import-2-key-vault-radio')),
        // eslint-disable-next-line prettier/prettier
        'Standard HD P2SH': element(by.id('import-standard-wallet-radio')),
      },
      proceedButton: element(by.id('confirm-import-button')),

      async chooseType(type: BasicWalletType) {
        await actions.tap(this.walletTypeRadios[type]);
      },

      async tapOnProceedButton() {
        await actions.tap(this.proceedButton);
      },
    });

    const ImportScreen = () => ({
      nameInput: element(by.id('import-wallet-name')),
      nameValidationError: element(by.id('import-wallet-name-validation-error')),
      seedPhraseInput: element(by.id('import-wallet-seed-phrase-input')),
      seedPhraseValidationError: element(by.id('import-wallet-seed-phrase-input-validation-error')),
      submitButton: element(by.id('submit-import-wallet-button')),
      scanQrButton: element(by.id('scan-import-wallet-qr-code-button')),

      async typeName(value: string) {
        await actions.typeText(this.nameInput, value, { closeKeyboard: true });
      },

      async typeSeedPhrase(value: string) {
        await actions.typeText(this.seedPhraseInput, value, { closeKeyboard: true });
      },

      async submit() {
        await actions.tap(this.submitButton);
      },

      async tapScanOnQrCode() {
        await actions.tap(this.scanQrButton);
      },
    });

    const AddFastKeyScreen = () => ({
      scanQrCodeButton: element(by.id('scan-public-key-code-button')),

      async tapScanOnQrCode() {
        await actions.tap(this.scanQrCodeButton);
      },
    });

    const AddCancelKeyScreen = () => ({
      scanQrCodeButton: element(by.id('scan-public-key-code-button')),

      async tapScanOnQrCode() {
        await actions.tap(this.scanQrCodeButton);
      },
    });

    return {
      chooseWalletTypeScreen: ChooseWalletTypeScreen(),
      importScreen: ImportScreen(),
      addFastKeyScreen: AddFastKeyScreen(),
      addCancelKeyScreen: AddCancelKeyScreen(),
      scanQrCodeScreen: ScanQrCodeScreen(),
      loadingScreen: MessageScreen('processingState'),
      successScreen: MessageScreen('success'),
    };
  };

  const subscribeToEmailNotifications = {
    getNotificationsScreen: {
      yesButton: element(by.id('confirm-button')),
      noButton: element(by.id('cancel-button')),

      async tapOnYes() {
        await actions.tap(this.yesButton);
      },

      async tapOnNo() {
        await actions.tap(this.noButton);
      },
    },

    verifyActionScreen: {
      pincodeInput: element(by.id('verify-action-code-input')),

      submitButton: element(by.id('submit-verify-action-code-button')),
      resendButton: element(by.id('resend-verify-action-code-button')),

      async typeCode(value: string) {
        await actions.typeText(this.pincodeInput, value);
      },

      async submit() {
        await actions.tap(this.submitButton);
      },

      async tapOnResendButton() {
        await actions.tap(this.resendButton);
      },
    },

    successScreen: MessageScreen('success'),
  };

  return {
    addNewWallet: AddNewWallet(),
    importWallet: ImportWallet(),
    subscribeToEmailNotifications,
    scanQrCodeScreen: ScanQrCodeScreen(),
  };
};

export default Wallets;
