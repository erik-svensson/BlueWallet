import { expect } from 'detox';

import { WALLETS_WITH_COINS } from '../../helpers/consts';
import { isBeta } from '../../helpers/utils';
import app from '../../pageObjects';
import steps from '../../steps';

const DATA_FOR_TRANSACTIONS = {
  DEFAULT_VALUE: 'Amount',
  AMOUNT_TO_RECEIVE: { INTEGER: '10', DECIMAL: '0.01' },
};

describe('Transactions', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
    await app.navigationBar.changeTab('wallets');
  });

  describe('Receive', () => {
    describe('3-Key Vault', () => {
      beforeEach(async () => {
        await steps.createWallet({
          type: '3-Key Vault',
          name: '3-Key',
          fastPublicKey: WALLETS_WITH_COINS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS_WITH_COINS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });
      });

      describe('@iOS @smoke', () => {
        it('should be possible to see QRCode, wallet address and receive amount (integer amount)', async () => {
          await app.dashboard.dashboardScreen.tapOnReceiveButton();
          await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
          await expect(app.transactionsReceive.walletAddressText).toBeVisible();
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
          await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER);
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(
            DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER,
          );
        });
      });
    });

    describe('3-Key Vault', () => {
      beforeEach(async () => {
        await steps.createWallet({
          type: '3-Key Vault',
          name: '3-Key',
          fastPublicKey: WALLETS_WITH_COINS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS_WITH_COINS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });
      });

      describe('@iOS @smoke', () => {
        it('should be possible to see QRCode, wallet address and receive amount (decimal amount)', async () => {
          await app.dashboard.dashboardScreen.tapOnReceiveButton();
          await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
          await expect(app.transactionsReceive.walletAddressText).toBeVisible();
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
          await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.DECIMAL);
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(
            DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.DECIMAL,
          );
        });
      });
    });

    describe('2-Key Vault', () => {
      beforeEach(async () => {
        await steps.createWallet({
          type: '2-Key Vault',
          name: '2-Key',
          cancelPublicKey: WALLETS_WITH_COINS['2-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });
      });

      describe('@iOS @regression', () => {
        it('should be possible to see QRCode, wallet address and receive amount', async () => {
          await app.dashboard.dashboardScreen.tapOnReceiveButton();
          await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
          await expect(app.transactionsReceive.walletAddressText).toBeVisible();
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
          await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER);
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(
            DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER,
          );
        });
      });
    });

    describe('Standard HD P2SH', () => {
      beforeEach(async () => {
        await steps.createWallet({
          type: 'Standard HD P2SH',
          name: 'Standard HD P2SH',
        });
      });

      describe('@iOS @regression', () => {
        it('should be possible to see QRCode, wallet address and receive amount', async () => {
          await app.dashboard.dashboardScreen.tapOnReceiveButton();
          await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
          await expect(app.transactionsReceive.walletAddressText).toBeVisible();
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
          await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER);
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(
            DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER,
          );
        });
      });
    });

    describe('Standard P2SH', () => {
      beforeEach(async () => {
        await steps.createWallet({
          type: 'Standard HD P2SH',
          name: 'Standard P2SH',
        });
      });

      describe('@iOS @regression', () => {
        it('should be possible to see QRCode, wallet address and receive amount', async () => {
          await app.dashboard.dashboardScreen.tapOnReceiveButton();
          await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
          await expect(app.transactionsReceive.walletAddressText).toBeVisible();
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
          await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER);
          await expect(app.transactionsReceive.receiveAmountText).toHaveText(
            DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER,
          );
        });
      });
    });
  });

  describe('Standard HD SegWit', () => {
    beforeEach(async () => {
      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: 'Standard HD SegWit',
      });
    });

    describe('@iOS @regression', () => {
      it('should be possible to see QRCode, wallet address and receive amount', async () => {
        await app.dashboard.dashboardScreen.tapOnReceiveButton();
        await expect(app.transactionsReceive.qrCodeIcon).toBeVisible();
        await expect(app.transactionsReceive.walletAddressText).toBeVisible();
        await expect(app.transactionsReceive.receiveAmountText).toHaveText(DATA_FOR_TRANSACTIONS.DEFAULT_VALUE);
        await app.transactionsReceive.typeAmountToReceive(DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER);
        await expect(app.transactionsReceive.receiveAmountText).toHaveText(
          DATA_FOR_TRANSACTIONS.AMOUNT_TO_RECEIVE.INTEGER,
        );
      });
    });
  });
});
