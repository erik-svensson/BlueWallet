import { expect as jestExpect } from '@jest/globals';
import { expect } from 'detox';

import { WALLETS_WITH_COINS, WALLETS } from '../helpers/consts';
import { TransactionStatus, TransactionType } from '../helpers/types';
import { isBeta } from '../helpers/utils';
import app from '../pageObjects';
import steps from '../steps';

describe('Dashboard', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
  });

  describe('@android @ios @smoke', () => {
    it('should display an empty list if there is no wallets added yet', async () => {
      await expect(app.dashboard.dashboardScreen.noWalletsIcon).toBeVisible();
    });

    it('should display a wallet tile if there is a single wallet added', async () => {
      const walletName = 'My Wallet';

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletName,
      });

      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
    });
  });

  describe('@android @ios @regression', () => {
    it('should display a wallets carousel if more than one wallet is added ', async () => {
      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: 'Main',
      });

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: 'Secondary',
      });

      await expect(app.dashboard.dashboardScreen.getWalletCardElement('All wallets')).toBeVisible();
      await expect(app.dashboard.dashboardScreen.getWalletDetailsButtonElement('All wallets')).toBeNotVisible();
    });

    it('should be possible to swtich between wallets using the wallets carousel', async () => {
      const walletNames = ['Main', 'Secondary', 'Tertiary'];

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletNames[0],
      });

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletNames[1],
      });

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletNames[2],
      });

      await expect(app.dashboard.dashboardScreen.getWalletCardElement('All wallets')).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('left');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[0])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('left');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[1])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('left');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[2])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('right');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[1])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('right');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[0])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithCarousel('right');
      await expect(app.dashboard.dashboardScreen.getWalletCardElement('All wallets')).toBeVisible();
    });

    it('should be possible to swtich between wallets using the wallets dropdown list', async () => {
      const walletNames = ['Main', 'Secondary'];

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletNames[0],
      });

      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: walletNames[1],
      });

      await app.dashboard.dashboardScreen.switchWalletWithDropdown(walletNames[0]);
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[0])).toBeVisible();

      await app.dashboard.dashboardScreen.switchWalletWithDropdown(walletNames[1]);
      await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletNames[1])).toBeVisible();
    });

    it('should be displayed Send and Cancel buttons for Standard wallets', async () => {
      await steps.createWallet({
        type: 'Standard HD P2SH',
        name: 'My Wallet',
      });

      await expect(app.dashboard.dashboardScreen.recieveButton).toBeVisible();
      await expect(app.dashboard.dashboardScreen.sendButton).toBeVisible();

      await expect(app.dashboard.dashboardScreen.cancelButton).toBeNotVisible();
    });

    it('should be displayed Send, Receive, and Cancel buttons for 2 Key Vault wallets', async () => {
      await steps.createWallet({
        type: '2-Key Vault',
        name: 'My Wallet',
        cancelPublicKey: WALLETS_WITH_COINS['2-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await expect(app.dashboard.dashboardScreen.recieveButton).toBeVisible();
      await expect(app.dashboard.dashboardScreen.cancelButton).toBeVisible();
      await expect(app.dashboard.dashboardScreen.sendButton).toBeVisible();
    });

    it('should be displayed Send, Receive, and Cancel buttons for 3 Key Vault wallets', async () => {
      await steps.createWallet({
        type: '3-Key Vault',
        name: 'My Wallet',
        fastPublicKey: WALLETS_WITH_COINS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
        cancelPublicKey: WALLETS_WITH_COINS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await expect(app.dashboard.dashboardScreen.recieveButton).toBeVisible();
      await expect(app.dashboard.dashboardScreen.cancelButton).toBeVisible();
      await expect(app.dashboard.dashboardScreen.sendButton).toBeVisible();
    });

    it('should display "No transaction to show" icon if there\'s no transactions to show', async () => {
      await steps.createWallet({
        type: '3-Key Vault',
        name: 'Main Wallet',
        fastPublicKey: WALLETS_WITH_COINS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
        cancelPublicKey: WALLETS_WITH_COINS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await app.dashboard.dashboardScreen.scrollTo(app.dashboard.dashboardScreen.noTransactionsIcon);
      await expect(app.dashboard.dashboardScreen.noTransactionsIcon).toBeVisible();
    });

    // Unskip it once the issue is solved
    it.skip('should display transactions of all added wallets under "All wallets" tile', async () => {
      const transactions = [...WALLETS['3-Key Vault'].TRANSACTIONS, ...WALLETS['2-Key Vault'].TRANSACTIONS];

      await steps.importWallet({
        type: '2-Key Vault',
        name: 'Secondary',
        seedPhrase: WALLETS['2-Key Vault'].SEED_PHRASE,
        cancelPublicKey: WALLETS['2-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await steps.importWallet({
        type: '3-Key Vault',
        name: 'Main',
        seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
        fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
        cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      for (const transaction of transactions) {
        await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
      }
    });

    // Unskip it once the issue is solved
    it.skip('should display only transactions of the wallet that is currently selected', async () => {
      await steps.importWallet({
        type: '3-Key Vault',
        name: 'Main',
        seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
        fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
        cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await steps.importWallet({
        type: '2-Key Vault',
        name: 'Secondary',
        seedPhrase: WALLETS['2-Key Vault'].SEED_PHRASE,
        cancelPublicKey: WALLETS['2-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });

      await app.dashboard.dashboardScreen.switchWalletWithDropdown('Main');

      for (const transaction of WALLETS['3-Key Vault'].TRANSACTIONS) {
        await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
      }

      for (const transaction of WALLETS['2-Key Vault'].TRANSACTIONS) {
        jestExpect(await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).toThrowError();
      }
    });

    it.skip('should display correctly details of positive transaction', async () => {});

    it.skip('should display correctly details of negative transaction', async () => {});
  });

  describe('Transaction details', () => {
    describe('@android @ios @smoke', () => {
      it('should be displayed all transaction details ', async () => {
        await steps.importWallet({
          type: '3-Key Vault',
          name: 'Main',
          seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
          fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });

        const transaction = WALLETS['3-Key Vault'].TRANSACTIONS[0];

        await app.dashboard.dashboardScreen.scrollToTransactionWith(transaction.id);
        await app.dashboard.dashboardScreen.tapOnTransaction(transaction.id);

        await expect(app.transactionDetails.header).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to copy the "from" address', async () => {
        await steps.importWallet({
          type: '3-Key Vault',
          name: 'Main',
          seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
          fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });

        const transaction = WALLETS['3-Key Vault'].TRANSACTIONS[0];

        await app.dashboard.dashboardScreen.scrollToTransactionWith(transaction.id);
        await app.dashboard.dashboardScreen.tapOnTransaction(transaction.id);

        await app.transactionDetails.tapOnFromCopyButton();
      });

      it('should be possible to copy the "to" address', async () => {
        await steps.importWallet({
          type: '3-Key Vault',
          name: 'Main',
          seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
          fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });

        const transaction = WALLETS['3-Key Vault'].TRANSACTIONS[0];

        await app.dashboard.dashboardScreen.scrollToTransactionWith(transaction.id);
        await app.dashboard.dashboardScreen.tapOnTransaction(transaction.id);

        await app.transactionDetails.tapOnToCopyButton();
      });

      it('should be possible to copy the "transaction id" address', async () => {
        await steps.importWallet({
          type: '3-Key Vault',
          name: 'Main',
          seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
          fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });

        const transaction = WALLETS['3-Key Vault'].TRANSACTIONS[0];

        await app.dashboard.dashboardScreen.scrollToTransactionWith(transaction.id);
        await app.dashboard.dashboardScreen.tapOnTransaction(transaction.id);

        await app.transactionDetails.tapOnTxidCopyButton();
      });

      it('should be possible to view the transaction in Explorer', async () => {
        await steps.importWallet({
          type: '3-Key Vault',
          name: 'Main',
          seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
          fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
          cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
        });

        const transaction = WALLETS['3-Key Vault'].TRANSACTIONS[0];

        await app.dashboard.dashboardScreen.scrollToTransactionWith(transaction.id);
        await app.dashboard.dashboardScreen.tapOnTransaction(transaction.id);

        await app.transactionDetails.tapOnViewInBlockExplorerButton();
      });
    });
  });

  describe('Filters', () => {
    beforeEach(async () => {
      await steps.importWallet({
        type: '3-Key Vault',
        name: 'Main',
        seedPhrase: WALLETS['3-Key Vault'].SEED_PHRASE,
        fastPublicKey: WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY,
        cancelPublicKey: WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
      });
    });

    describe('@android @ios @regression', () => {
      it('should be possible to filter by Received transaction type', async () => {
        const receivedTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => transaction.type === TransactionType.RECEIVED,
        );

        const restTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => !receivedTransactions.includes(transaction),
        );

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnReceivedFilterOption();
        await app.filtersScreen.tapOnApplyFiltersButton();

        for (const transaction of receivedTransactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }

        for (const transaction of restTransactions) {
          jestExpect(app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).rejects.toThrowError();
        }
      });

      it('should be possible to filter by Sent transaction type', async () => {
        const receivedTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => transaction.type === TransactionType.SENT,
        );

        const restTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => !receivedTransactions.includes(transaction),
        );

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnSentFilterOption();
        await app.filtersScreen.tapOnApplyFiltersButton();

        for (const transaction of receivedTransactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }

        for (const transaction of restTransactions) {
          jestExpect(app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).rejects.toThrowError();
        }
      });

      // This test isn't finished yet.
      it.skip('should be possible to filter by sender', async () => {
        const fromAddress = '2NFCCzE2oWvMx2Z4hvgfsmDHqD4eo3Gczpe';
        const transactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => transaction.from === fromAddress,
        );

        const restTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => !transactions.includes(transaction),
        );

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.chooseContactToFilterBy(fromAddress);
        await app.filtersScreen.tapOnApplyFiltersButton();

        for (const transaction of transactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }

        for (const transaction of restTransactions) {
          jestExpect(app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).rejects.toThrowError();
        }
      });

      it.skip('should be possible to filter by date', async () => {});

      it('should be possible to filter by amount', async () => {
        const transactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(transaction => transaction.amount >= 0.01);

        const restTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => !transactions.includes(transaction),
        );

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.typeFromAmount('0.01');
        await app.filtersScreen.tapOnApplyFiltersButton();

        for (const transaction of transactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }

        for (const transaction of restTransactions) {
          jestExpect(app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).rejects.toThrowError();
        }
      });

      it('should be possible to filter by CANCELED status', async () => {
        const transactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => transaction.status === TransactionStatus.CANCELED_DONE,
        );

        const restTransactions = WALLETS['3-Key Vault'].TRANSACTIONS.filter(
          transaction => !transactions.includes(transaction),
        );

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnSentFilterOption();
        await app.filtersScreen.tapOnStatusOption(TransactionStatus.CANCELED_DONE);
        await app.filtersScreen.tapOnApplyFiltersButton();

        for (const transaction of transactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }

        for (const transaction of restTransactions) {
          jestExpect(app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id)).rejects.toThrowError();
        }
      });

      it("shouldn't apply filters if a user exited the screen by back button", async () => {
        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnStatusOption(TransactionStatus.CANCELED_DONE);

        await app.filtersScreen.header.tapOnBackButton();
        await expect(app.filtersScreen.clearAllFiltersButton).toBeNotVisible();
      });

      it('should be possible to clear all applied filters from Dashboard screen', async () => {
        const transactions = WALLETS['3-Key Vault'].TRANSACTIONS;

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnStatusOption(TransactionStatus.CANCELED_DONE);
        await app.filtersScreen.tapOnApplyFiltersButton();

        await app.dashboard.dashboardScreen.tapOnClearAllFiltersButton();

        for (const transaction of transactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }
      });

      it('should be possible to clear all applied filters from Filter transactions screen', async () => {
        const transactions = WALLETS['3-Key Vault'].TRANSACTIONS;

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnStatusOption(TransactionStatus.CANCELED_DONE);
        await app.filtersScreen.tapOnApplyFiltersButton();

        await app.dashboard.dashboardScreen.tapOnFilterButton();
        await app.filtersScreen.tapOnClearAllButton();
        await app.filtersScreen.header.tapOnBackButton();

        for (const transaction of transactions) {
          await app.dashboard.dashboardScreen.searchForTransactionWith(transaction.id);
        }
      });
    });
  });
});
