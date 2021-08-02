import { expect } from 'detox';

import { ecdsaKeys } from '../../data';
import { isBeta } from '../../helpers/utils';
import app from '../../pageObjects';
import steps from '../../steps';
import { WalletType } from '../../types';

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
          type: WalletType.KEY_3,
          name: '3-Key',
          secrets: ecdsaKeys,
        });
      });

      describe('@ios @smoke', () => {
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

      describe('@ios @smoke', () => {
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
          type: WalletType.KEY_2,
          name: '2-Key',
          secrets: ecdsaKeys,
        });
      });

      describe('@ios @regression', () => {
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
          type: WalletType.S_HD_P2SH,
          name: 'HD P2SH',
        });
      });

      describe('@ios @regression', () => {
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

    describe('Advanced wallets', () => {
      beforeEach(async () => {
        await app.navigationBar.changeTab('settings');
        await app.settings.settingsScreen.tapOnAdvancedOptions();
        await app.settings.advancedOptionsScreen.tapOnAdvancedOptionsSwitch();
        await app.header.tapOnBackButton();
      });

      describe('Standard P2SH', () => {
        beforeEach(async () => {
          await steps.createWallet({
            type: WalletType.S_P2SH,
            name: 'P2SH',
          });
        });

        describe('@ios @regression', () => {
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

      describe('Standard HD SegWit', () => {
        beforeEach(async () => {
          await steps.createWallet({
            type: WalletType.S_HD_SEGWIT,
            name: 'SegWit',
          });
        });

        describe('@ios @regression', () => {
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
  });
});
