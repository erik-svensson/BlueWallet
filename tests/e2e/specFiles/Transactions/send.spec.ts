import { expect } from 'detox';

import { isBeta, createRandomNote, WALLETS_WITH_COINS, DEFAULT_TRANSACTION_PASSWORD } from '../../helpers';
import app from '../../pageObjects';
import { importExistingWallet } from '../../steps';

const DATA_FOR_TRANSACTIONS = {
  AMOUNT_TO_SEND: '0.0001',
  WALLET_ADDRESS: '2MuY5McUz14TH6B3H9EypErpnFjNbNeqDVz',
};

describe('Transactions', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.navigationBar.changeTab('wallets');
  });

  describe('Send', () => {
    describe('@ios @smoke', () => {
      it('should be possible to send coins from 3-Key Vault wallet (Secure Transaction) to 3-Key Vault wallet', async () => {
        const transactionNote = createRandomNote();

        await importExistingWallet({
          type: '3-Key Vault',
          name: '3-Key wallet',
          fastPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].FAST_KEY,
          cancelPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].CANCEL_KEY,
          seedPhrase: WALLETS_WITH_COINS['3-Keys Vault'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
        await app.transactionsSend.sendCoinsMainScreen.chooseTransactionType('Secure');
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@ios @regression', () => {
      it('should be possible to send coins from 3-Key Vault wallet (Fast Transaction) to 3-Key Vault wallet', async () => {
        await importExistingWallet({
          type: '3-Key Vault',
          name: '3-Key wallet',
          fastPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].FAST_KEY,
          cancelPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].CANCEL_KEY,
          seedPhrase: WALLETS_WITH_COINS['3-Keys Vault'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.chooseTransactionType('Secure Fast');
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from 2-Key Vault wallet to 3-Key Vault wallet', async () => {
        const transactionNote = createRandomNote();

        await importExistingWallet({
          type: '2-Key Vault',
          name: '2-Key wallet',
          cancelPublicKey: WALLETS_WITH_COINS['2-Keys Vault'].CANCEL_KEY,
          seedPhrase: WALLETS_WITH_COINS['2-Keys Vault'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard HD P2SH wallet to 3-Key Vault wallet', async () => {
        const transactionNote = createRandomNote();

        await importExistingWallet({
          type: 'Standard HD P2SH',
          name: 'Standard HD wallet',
          seedPhrase: WALLETS_WITH_COINS['Standard HD P2SH'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard P2SH wallet to 3-Key Vault wallet', async () => {
        const transactionNote = createRandomNote();

        await importExistingWallet({
          type: 'Standard HD P2SH',
          name: 'Standard P2SH',
          seedPhrase: WALLETS_WITH_COINS['Standard P2SH'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard HD SegWit wallet to 3-Key Vault wallet', async () => {
        const transactionNote = createRandomNote();

        await importExistingWallet({
          type: 'Standard HD P2SH',
          name: 'Standard HD Segwit wallet',
          seedPhrase: WALLETS_WITH_COINS['Standard HD Segwit'].SEED_PHRASE,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND);
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(DATA_FOR_TRANSACTIONS.WALLET_ADDRESS);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(transactionNote);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.sendCoinsConfirmationScreen.tapSendButton();
        await app.transactionsSend.sendCoinsPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.sendCoinsPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });
  });
});
