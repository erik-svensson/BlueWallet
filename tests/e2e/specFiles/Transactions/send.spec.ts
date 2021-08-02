import { expect } from 'detox';

import data, { DEFAULT_TRANSACTION_PASSWORD } from '../../data';
import { isBeta, randomString } from '../../helpers/utils';
import app from '../../pageObjects';
import steps from '../../steps';
import { WalletType } from '../../types';

const DATA_FOR_TRANSACTIONS = {
  AMOUNT_TO_SEND: { DECIMAL: '0.00001', INTEGER: '100' },
};

describe('Transactions', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
    await app.navigationBar.changeTab('wallets');
  });

  describe('Send', () => {
    describe('@ios @smoke', () => {
      it('should be possible to send coins from 3-Key Vault wallet (Secure Transaction) to 3-Key Vault wallet', async () => {
        const note = randomString();

        await steps.importWallet({
          type: WalletType.KEY_3,
          name: '3-Key wallet',
          secrets: data.activeTxWallets[WalletType.KEY_3],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(note);
        await app.transactionsSend.sendCoinsMainScreen.chooseTransactionType('Secure');
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@ios @regression', () => {
      it('should be possible to send coins from 3-Key Vault wallet (Fast Transaction) to 3-Key Vault wallet', async () => {
        const secrets = data.activeTxWallets[WalletType.KEY_3];

        await steps.importWallet({
          type: WalletType.KEY_3,
          name: '3-Key wallet',
          secrets,
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.chooseTransactionType('Secure Fast');
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
        await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(secrets.fastKey.privateKey);
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from 2-Key Vault wallet to 3-Key Vault wallet', async () => {
        const note = randomString();

        await steps.importWallet({
          type: WalletType.KEY_2,
          name: '2-Key wallet',
          secrets: data.activeTxWallets[WalletType.KEY_2],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(note);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard HD P2SH wallet to 3-Key Vault wallet', async () => {
        const note = randomString();

        await steps.importWallet({
          type: WalletType.S_HD_P2SH,
          name: 'Standard HD wallet',
          secrets: data.activeTxWallets[WalletType.S_HD_P2SH],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(note);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard P2SH wallet to 3-Key Vault wallet', async () => {
        const note = randomString();

        await steps.importWallet({
          type: WalletType.S_HD_P2SH,
          name: 'HD P2SH',
          secrets: data.activeTxWallets[WalletType.S_P2SH],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(note);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to send coins from Standard HD SegWit wallet to 3-Key Vault wallet', async () => {
        const note = randomString();

        await steps.importWallet({
          type: WalletType.S_HD_P2SH,
          name: 'Standard HD Segwit wallet',
          secrets: data.activeTxWallets[WalletType.S_HD_SEGWIT],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.DECIMAL,
        );
        await app.transactionsSend.sendCoinsMainScreen.typeWalletAddress(data.moneybox.address);
        await app.transactionsSend.sendCoinsMainScreen.typeNote(note);
        await app.transactionsSend.sendCoinsMainScreen.tapNextButton();
        await app.transactionsSend.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsSend.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsSend.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@ios @smoke', () => {
      it('should be possible to enter integer amount of coins to send', async () => {
        await steps.importWallet({
          type: WalletType.KEY_3,
          name: '3-Key wallet',
          secrets: data.activeTxWallets[WalletType.KEY_3],
        });
        await app.dashboard.dashboardScreen.tapOnSendButton();
        await app.transactionsSend.sendCoinsMainScreen.typeCoinsAmountToSend(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.INTEGER,
        );
        expect(app.transactionsSend.sendCoinsMainScreen.amountInput).toHaveText(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND.INTEGER,
        );
      });
    });
  });
});
