import app from './pageObjects';
import { CreateWalletOptions, ImportWalletOptions } from './pageObjects/types';

const passThroughOnboarding = async (pin: string, password: string) => {
  await app.onboarding.createPinScreen.typePin(pin);
  await app.onboarding.confirmPinScreen.typePin(pin);

  await app.onboarding.createPasswordScreen.typePassword(password);
  await app.onboarding.createPasswordScreen.submit();

  await app.onboarding.confirmPasswordScreen.typePassword(password);
  await app.onboarding.confirmPasswordScreen.submit();

  await app.onboarding.successScreen.close();
};

const createWallet = async (options: CreateWalletOptions) => {
  const { type, name, fastPublicKey, cancelPublicKey } = options;

  await app.dashboard.dashboardScreen.tapOnAddButton();
  await app.wallets.addNewWallet.createScreen.typeName(name);
  await app.wallets.addNewWallet.createScreen.chooseType(type);
  await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

  if (type === '3-Key Vault') {
    await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(fastPublicKey!);
  }

  if (type === '3-Key Vault' || type === '2-Key Vault') {
    await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(cancelPublicKey!);
  }

  await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
  await app.wallets.addNewWallet.successScreen.tapOnCloseButton();
};

const importWallet = async (options: ImportWalletOptions) => {
  const { type, name, seedPhrase, fastPublicKey, cancelPublicKey } = options;

  await app.dashboard.dashboardScreen.tapOnAddButton();
  await app.wallets.addNewWallet.createScreen.tapOnImportButton();
  await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(type);
  await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

  await app.wallets.importWallet.importScreen.typeName(name);
  await app.wallets.importWallet.importScreen.typeSeedPhrase(seedPhrase);
  await app.wallets.importWallet.importScreen.submit();

  if (type === '3-Key Vault') {
    await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(fastPublicKey!);
  }

  if (type === '3-Key Vault' || type === '2-Key Vault') {
    await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(cancelPublicKey!);
  }

  await app.wallets.importWallet.loadingScreen.waitUntilEnded();
  await app.wallets.importWallet.successScreen.close();
};

const createAuthenticator = async (name: string) => {
  await app.authenticators.dashboardScreen.tapOnAddButton();

  await app.authenticators.addNewAuthenticator.createScreen.typeName(name);
  await app.authenticators.addNewAuthenticator.createScreen.submit();
  await app.authenticators.addNewAuthenticator.loadingScreen.waitUntilEnded();
  await app.authenticators.addNewAuthenticator.publicKeyScreen.proceed();
  await app.authenticators.addNewAuthenticator.seedPhraseScreen.proceed();
};

export const createNewContact = async (name: string, address: string) => {
  await app.addressBook.contactsScreen.tapOnCreateButton();
  await app.addressBook.newContact.addNewContactScreen.typeName(name);
  await app.addressBook.newContact.addNewContactScreen.typeAddress(address);
  await app.addressBook.newContact.addNewContactScreen.submit();
  await app.addressBook.newContact.successScreen.close();
};

const steps = { passThroughOnboarding, createWallet, importWallet, createAuthenticator, createNewContact };

export default steps;
