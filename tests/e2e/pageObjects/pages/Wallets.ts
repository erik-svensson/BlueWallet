import { by, element } from 'detox';
import { act } from 'react-test-renderer';

import actions from '../../actions';
import MessageScreen from '../common/MessageScreen';
import ScanQrCodeScreen from '../common/ScanQrCodeScreen';

export type WalletType = '3-Key Vault' | '2-Key Vault' | 'Standard HD P2SH' | 'Standard P2SH' | 'Standard HD SegWit';

export interface ImportWalletOptions {
  type: WalletType;
  name: string;
  seedPhrase: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
}

export interface CreateWalletOptions {
  type: WalletType;
  name: string;
  fastPublicKey?: string;
  cancelPublicKey?: string;
}

const Wallets = () => {
  const DashboardScreen = () => ({
    header: element(by.id('dashboard-header')),
    self: element(by.id('dashboard-screen')),

    noWalletsIcon: element(by.id('no-wallets-icon')),
    filterTransactionsButton: element(by.id('filter-transactions-button')),
    addButton: element(by.id('add-wallet-button')),
    sendButton: element(by.id('send-coins-button')),

    getTransactionElement: (note: string) => element(by.id(`transaction-item-${note}`)),

    async tapOnAddButton() {
      await actions.tap(this.addButton);
    },

    async tapOnFilterButton() {
      await actions.tap(this.filterTransactionsButton);
    },

    async tapOnWallet(name: string) {
      const wallet = element(by.id(`wallet-${name}`));

      await actions.tap(wallet);
    },

    async tapOnSendButton() {
      await actions.tap(this.sendButton);
    },

    async scrollToTheTransactionWithNote(note: string) {
      await actions.scrollToElement(element(by.id(`transaction-item-${note}`)), 'dashboard-screen');
    },
  });

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

      async chooseType(type: WalletType) {
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

  const dashboardScreen = DashboardScreen();
  const addNewWallet = AddNewWallet();
  const importWallet = ImportWallet();
  const scanQrCodeScreen = ScanQrCodeScreen();

  async function createWallet(options: CreateWalletOptions): Promise<void> {
    const { type, name, fastPublicKey, cancelPublicKey } = options;

    await dashboardScreen.tapOnAddButton();
    await addNewWallet.createScreen.typeName(name);
    await addNewWallet.createScreen.chooseType(type);
    await addNewWallet.createScreen.tapOnCreateButton();

    if (type === '3-Key Vault') {
      await addNewWallet.addFastKeyScreen.tapScanOnQrCode();
      await addNewWallet.scanQrCodeScreen.scanCustomString(fastPublicKey!);
    }

    if (type === '3-Key Vault' || type === '2-Key Vault') {
      await addNewWallet.addFastKeyScreen.tapScanOnQrCode();
      await addNewWallet.scanQrCodeScreen.scanCustomString(cancelPublicKey!);
    }

    await addNewWallet.loadingScreen.waitUntilEnded();
    await addNewWallet.successScreen.tapOnCloseButton();
  }

  async function importExistingWallet(options: ImportWalletOptions): Promise<void> {
    const { type, name, seedPhrase, fastPublicKey, cancelPublicKey } = options;

    await dashboardScreen.tapOnAddButton();
    await addNewWallet.createScreen.tapOnImportButton();
    await importWallet.chooseWalletTypeScreen.chooseType(type);
    await importWallet.chooseWalletTypeScreen.tapOnProceedButton();

    await importWallet.importScreen.typeName(name);
    await importWallet.importScreen.typeSeedPhrase(seedPhrase);
    await importWallet.importScreen.submit();

    if (type === '3-Key Vault') {
      await addNewWallet.addFastKeyScreen.tapScanOnQrCode();
      await addNewWallet.scanQrCodeScreen.scanCustomString(fastPublicKey!);
    }

    if (type === '3-Key Vault' || type === '2-Key Vault') {
      await addNewWallet.addFastKeyScreen.tapScanOnQrCode();
      await addNewWallet.scanQrCodeScreen.scanCustomString(cancelPublicKey!);
    }

    await importWallet.loadingScreen.waitUntilEnded();
    await importWallet.successScreen.close();
  }

  return { dashboardScreen, addNewWallet, importWallet, scanQrCodeScreen, createWallet, importExistingWallet };
};

export default Wallets;
