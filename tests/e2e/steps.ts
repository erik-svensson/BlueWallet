/* eslint-disable no-redeclare */
/**
 * Set of helper functions that perform actions that require "more than one click on UI".
 * Usefully especially if we need to set up a state before the actual test
 */
import mailing, { Subject } from './mailing';
import app from './pageObjects';
import {
  CreateWalletOptions,
  ImportWalletOptions,
  SendCoinsOptions,
  CreateStandardWalletOptions,
  Create2KeyWalletOptions,
  Create3KeyWalletOptions,
  ImportStandardWalletOptions,
  Import2KeyWalletOptions,
  Import3KeyWalletOptions,
  WalletType,
} from './types';

/** Passes through the screens from Create PIN until Confirm Transaction Password */
const passThroughOnboarding = async (pin: string, password: string, emailAddress?: string) => {
  await app.onboarding.createPinScreen.typePin(pin);
  await app.onboarding.confirmPinScreen.typePin(pin);

  await app.onboarding.createPasswordScreen.typePassword(password);
  await app.onboarding.createPasswordScreen.submit();

  await app.onboarding.confirmPasswordScreen.typePassword(password);
  await app.onboarding.confirmPasswordScreen.submit();

  if (emailAddress) {
    await app.onboarding.addEmailNotificationScreen.typeEmailAddress(emailAddress);
    await app.onboarding.addEmailNotificationScreen.submit();

    const code = await mailing.getCode(emailAddress, Subject.ADD_EMAIL);

    await app.onboarding.confirmEmailAddressScreen.typeCode(code);
    await app.onboarding.confirmEmailAddressScreen.submit();
  } else {
    await app.onboarding.addEmailNotificationScreen.skip();
  }

  await app.onboarding.successScreen.close();
};

/** Passes through the screens to create a wallet */
async function createWallet(options: CreateStandardWalletOptions): Promise<void>;
async function createWallet(options: Create2KeyWalletOptions): Promise<void>;
async function createWallet(options: Create3KeyWalletOptions): Promise<void>;
async function createWallet(options: CreateWalletOptions): Promise<void> {
  const { type, name, secrets, emailAddress, skipEmailSubscription } = options;

  await app.navigationBar.changeTab('wallets');

  await app.dashboard.dashboardScreen.tapOnAddWalletButton();
  await app.wallets.addNewWallet.createScreen.typeName(name);
  await app.wallets.addNewWallet.createScreen.chooseType(type);
  await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

  if (type === WalletType.KEY_3) {
    await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(secrets!.fastKey!.publicKey);
  }

  if (type === WalletType.KEY_3 || type === WalletType.KEY_2) {
    await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(secrets!.cancelKey!.publicKey);
  }

  await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();

  if (type !== WalletType.S_P2SH) {
    const seed = await app.wallets.addNewWallet.seedScreen.getSeed();

    await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
    await app.wallets.addNewWallet.confirmSeedScreen.confirmSeed(seed);
  } else {
    await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
  }

  if (emailAddress) {
    await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

    const code = await mailing.getCode(emailAddress, Subject.SUBSCRIBE);

    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

    await app.wallets.subscribeToEmailNotifications.successScreen.close();
  } else if (skipEmailSubscription) {
    await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnNo();
    await app.wallets.subscribeToEmailNotifications.successScreen.close();
  } else {
    await app.wallets.importWallet.successScreen.close();
  }
}

/** Passes through the screens to import a wallet */
async function importWallet(options: ImportStandardWalletOptions): Promise<void>;
async function importWallet(options: Import2KeyWalletOptions): Promise<void>;
async function importWallet(options: Import3KeyWalletOptions): Promise<void>;
async function importWallet(options: ImportWalletOptions) {
  const { type, name, secrets, emailAddress, skipEmailSubscription } = options;

  await app.navigationBar.changeTab('wallets');

  await app.dashboard.dashboardScreen.tapOnAddWalletButton();
  await app.wallets.addNewWallet.createScreen.tapOnImportButton();
  await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(type);
  await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

  await app.wallets.importWallet.importScreen.typeName(name);
  await app.wallets.importWallet.importScreen.pasteSeedPhrase(secrets.seedPhrase);
  await app.wallets.importWallet.importScreen.submit();

  if (type === WalletType.KEY_3) {
    await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(secrets.fastKey!.publicKey);
  }

  if (type === WalletType.KEY_3 || type === WalletType.KEY_2) {
    await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
    await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(secrets.cancelKey!.publicKey);
  }

  if (emailAddress) {
    await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

    const code = await mailing.getCode(emailAddress, Subject.SUBSCRIBE);

    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

    await app.wallets.subscribeToEmailNotifications.successScreen.close();
  } else if (skipEmailSubscription) {
    await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnNo();
    await app.wallets.subscribeToEmailNotifications.successScreen.close();
  } else {
    await app.wallets.importWallet.successScreen.close();
  }
}

/** Passes through the screens to create an authenticator */
const createAuthenticator = async (name: string) => {
  await app.navigationBar.changeTab('authenticators');

  await app.authenticators.dashboardScreen.tapOnAddButton();

  await app.authenticators.addNewAuthenticator.createScreen.typeName(name);
  await app.authenticators.addNewAuthenticator.createScreen.submit();
  await app.authenticators.addNewAuthenticator.publicKeyScreen.proceed();
  await app.authenticators.addNewAuthenticator.seedPhraseScreen.proceed();
};

/** Passes through the screens to create a new contact */
export const createNewContact = async (name: string, address: string) => {
  await app.navigationBar.changeTab('address book');

  await app.addressBook.contactsScreen.tapOnCreateButton();
  await app.addressBook.newContact.addNewContactScreen.typeName(name);
  await app.addressBook.newContact.addNewContactScreen.typeAddress(address);
  await app.addressBook.newContact.addNewContactScreen.submit();
  await app.addressBook.newContact.successScreen.close();
};

const sendCoins = async (options: SendCoinsOptions) => {
  const {
    type,
    amount: amountToSend,
    walletAddress: walletAdress,
    transactionNote,
    transactionType,
    transactionPassword,
  } = options;

  await app.dashboard.dashboardScreen.tapOnSendButton();
  await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(amountToSend);
  await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(walletAdress);

  if (transactionNote !== undefined) {
    await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
  }
  if (type === WalletType.KEY_3) {
    await app.transactionsSend.sendCoinsMainScreen.chooseTransactionType(transactionType!);
  }

  await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
  await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
  await app.transactionsSend.transactionPasswordScreen.typePassword(transactionPassword);
  await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
  await app.transactionsSend.successScreen.close();
};

const steps = { passThroughOnboarding, createWallet, importWallet, createAuthenticator, createNewContact, sendCoins };

export default steps;
