import { expect } from 'detox';

import { isBeta, WALLETS_WITH_COINS } from '../helpers';
import app from '../pageObjects';

describe('Wallet details', () => {
  const walletName = 'Scrooge McDuck wallet';

  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());

    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.navigationBar.changeTab('wallets');
  });

  beforeEach(async () => {
    await app.wallets.importExistingWallet({
      type: '3-Key Vault',
      name: walletName,
      fastPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].FAST_KEY,
      cancelPublicKey: WALLETS_WITH_COINS['3-Keys Vault'].CANCEL_KEY,
      seedPhrase: WALLETS_WITH_COINS['3-Keys Vault'].SEED_PHRASE,
    });
  });

  describe('@ios @android @smoke', () => {
    it('should be possible to check details', async () => {
      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
      await expect(app.walletDetails.mainScreen.walletType).toBeVisible();
    });
  });

  describe('@ios @android @regression', () => {
    it('should be possible to rename the wallet name', async () => {
      const newWalletName = 'Huey, Dewey and Louie wallet';

      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.renameWalletName(newWalletName);
      await expect(app.walletDetails.mainScreen.walletName).toHaveLabel(newWalletName);
    });

    it('should be possible to check seed phrase of the wallet', async () => {
      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnExportWalletButton();

      await expect(app.walletDetails.exportWalletScreen.qrCode).toBeVisible();
      await expect(app.walletDetails.exportWalletScreen.seedPhrase).toBeVisible();
    });

    it('should be possible to check and copy the wallet XPUB', async () => {
      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnShowXpubButton();

      await expect(app.walletDetails.showXpubScreen.qrCode).toBeVisible();
      await expect(app.walletDetails.showXpubScreen.xpub).toBeVisible();

      await app.walletDetails.showXpubScreen.tapOnCopyButton();
      // TODO: Add assertion
    });

    it('should be possible to delete the wallet', async () => {
      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnDeleteButton();
      await app.walletDetails.deleteScreen.confirm();

      await expect(app.walletDetails.deleteSuccessScreen.icon).toBeVisible();
    });

    it('should be possible to tap "No" and abort deleting wallet process', async () => {
      await app.wallets.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnDeleteButton();
      await app.walletDetails.deleteScreen.cancel();

      await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
    });
  });
});
