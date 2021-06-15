/**
 * Set of helper functions that perform actions that require "more than one click on UI".
 * Usefully especially if we need to set up a state before the actual test
 */
import gmailClient from './gmail';
import app from './pageObjects';
import { CreateWalletOptions, ImportWalletOptions, SendCoinsOptions } from './pageObjects/types';

/** Passes through the screens from Create PIN until Confirm Transaction Password */
const passThroughOnboarding = async (pin: string, password: string) => {
  await app.onboarding.createPinScreen.typePin(pin);
  await app.onboarding.confirmPinScreen.typePin(pin);

  await app.onboarding.createPasswordScreen.typePassword(password);
  await app.onboarding.createPasswordScreen.submit();

  await app.onboarding.confirmPasswordScreen.typePassword(password);
  await app.onboarding.confirmPasswordScreen.submit();

  await app.onboarding.successScreen.close();
};

/** Passes through the screens to create a wallet */
const createWallet = async (options: CreateWalletOptions) => {
  // TODO: "fastPublicKey" should be required if the type === '3-Key Vault'.
  // The same with 2-Key Vault. It'd be best to overload the function IMHO
  const { type, name, fastPublicKey, cancelPublicKey, emailAddress } = options;

  await app.navigationBar.changeTab('wallets');

  await app.dashboard.dashboardScreen.tapOnCreateWalletButton();
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

  if (emailAddress) {
    await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

    const code = await gmailClient.getActionVerificationCode({ receiver: emailAddress });

    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
    await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

    await app.wallets.subscribeToEmailNotifications.successScreen.close();
  }
};

/** Passes through the screens to import a wallet */
const importWallet = async (options: ImportWalletOptions) => {
  // TODO: "fastPublicKey" should be required if the type === '3-Key Vault'.
  // The same with 2-Key Vault. It'd be best to overload the function IMHO
  const { type, name, seedPhrase, fastPublicKey, cancelPublicKey, emailAddress } = options;

  await app.navigationBar.changeTab('wallets');

  await app.dashboard.dashboardScreen.tapOnCreateWalletButton();
  await app.wallets.addNewWallet.createScreen.tapOnImportButton();
  await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(type);
  await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

  await app.wallets.importWallet.importScreen.typeName(name);
  await app.wallets.importWallet.importScreen.pasteSeedPhrase(seedPhrase);
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

  if (emailAddress) {
    // TODO: Finish this part later on.
  }
};

/** Passes through the screens to create an authenticator */
const createAuthenticator = async (name: string) => {
  await app.navigationBar.changeTab('authenticators');

  await app.authenticators.dashboardScreen.tapOnAddButton();

  await app.authenticators.addNewAuthenticator.createScreen.typeName(name);
  await app.authenticators.addNewAuthenticator.createScreen.submit();
  await app.authenticators.addNewAuthenticator.loadingScreen.waitUntilEnded();
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
  if (type === '3-Key Vault') {
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
