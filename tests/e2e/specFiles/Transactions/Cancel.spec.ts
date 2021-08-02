import { expect } from 'detox';

import data, { DEFAULT_TRANSACTION_PASSWORD } from '../../data';
import { isBeta, randomString } from '../../helpers/utils';
import app from '../../pageObjects';
import steps from '../../steps';
import { WalletType } from '../../types';

const DATA_FOR_TRANSACTIONS = {
  AMOUNT_TO_SEND: '0.00001',
};

describe('Transactions', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
    await app.navigationBar.changeTab('wallets');
  });

  describe('Cancel', () => {
    describe('@ios @regression', () => {
      // TODO: Test is disabled due to long transaction confirmations.
      xit('should be possible to cancel transaction for 3-Key Vault wallet', async () => {
        const note = randomString();
        const secrets = data.activeTxWallets[WalletType.KEY_3];

        await steps.importWallet({
          type: WalletType.KEY_3,
          name: '3-Key wallet',
          secrets,
        });
        await steps.sendCoins({
          type: WalletType.KEY_3,
          amount: DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND,
          walletAddress: data.moneybox.address,
          transactionNote: note,
          transactionType: 'Secure',
          transactionPassword: DEFAULT_TRANSACTION_PASSWORD,
        });
        await app.dashboard.dashboardScreen.refreshDashboard();
        await app.dashboard.dashboardScreen.scrollToTransactionWith(note);
        await app.dashboard.dashboardScreen.waitForConfirmationForTransactionWith(note);
        await app.dashboard.dashboardScreen.scrollToCancelButton();
        await app.dashboard.dashboardScreen.tapOnCancelButton();
        await app.transactionsCancel.transactionListScreen.chooseTransactionFromTheList(note);
        await app.transactionsCancel.transactionListScreen.tapNextButton();
        await app.transactionsCancel.transactionDetailsScreen.tapUseWalletAddressButton();
        await app.transactionsCancel.transactionDetailsScreen.tapNextButton();
        await app.transactionsCancel.seedPhraseScreen.typePrivateCancelKeySeedPhrase(
          secrets.cancelKey.privateKeyPhrase,
        );
        await app.transactionsCancel.seedPhraseScreen.tapCancelButton();
        await app.transactionsCancel.seedPhraseScreen.typePrivateFastKeySeedPhrase(secrets.fastKey.privateKeyPhrase);
        await app.transactionsCancel.seedPhraseScreen.tapCancelButton();
        await app.transactionsCancel.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsCancel.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsCancel.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });

    describe('@ios @regression', () => {
      // TODO: Test is disabled due to long transaction confirmations.
      xit('should be possible to cancel transaction for 2-Key Vault wallet', async () => {
        const note = randomString();
        const secrets = data.activeTxWallets[WalletType.KEY_2];

        await steps.importWallet({
          type: WalletType.KEY_2,
          name: '2-Key wallet',
          secrets,
        });
        await steps.sendCoins({
          type: WalletType.KEY_2,
          amount: DATA_FOR_TRANSACTIONS.AMOUNT_TO_SEND,
          walletAddress: data.moneybox.address,
          transactionNote: note,
          transactionPassword: DEFAULT_TRANSACTION_PASSWORD,
        });
        await app.dashboard.dashboardScreen.refreshDashboard();
        await app.dashboard.dashboardScreen.scrollToTransactionWith(note);
        await app.dashboard.dashboardScreen.waitForConfirmationForTransactionWith(note);
        await app.dashboard.dashboardScreen.scrollToCancelButton();
        await app.dashboard.dashboardScreen.tapOnCancelButton();
        await app.transactionsCancel.transactionListScreen.chooseTransactionFromTheList(note);
        await app.transactionsCancel.transactionListScreen.tapNextButton();
        await app.transactionsCancel.transactionDetailsScreen.tapUseWalletAddressButton();
        await app.transactionsCancel.transactionDetailsScreen.tapNextButton();
        await app.transactionsCancel.seedPhraseScreen.typePrivateCancelKeySeedPhrase(
          secrets.cancelKey.privateKeyPhrase,
        );
        await app.transactionsCancel.seedPhraseScreen.tapCancelButton();
        await app.transactionsCancel.transactionConfirmationScreen.tapConfirmButton();
        await app.transactionsCancel.transactionPasswordScreen.typePassword(DEFAULT_TRANSACTION_PASSWORD);
        await app.transactionsCancel.transactionPasswordScreen.tapConfirmPasswordButton();
        await expect(app.transactionsSend.successScreen.icon).toBeVisible();
      });
    });
  });
});
