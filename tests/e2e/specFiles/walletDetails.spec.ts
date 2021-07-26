import { expect } from 'detox';

import { expectToBeCopied } from '../assertions';
import { WALLETS_WITH_COINS } from '../helpers/consts';
import { isBeta } from '../helpers/utils';
import app from '../pageObjects';
import steps from '../steps';
import { WalletType } from '../types';

describe('Wallet details', () => {
  const walletName = 'Scrooge McDuck wallet';

  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());

    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
    await app.navigationBar.changeTab('wallets');
  });

  beforeEach(async () => {
    await steps.importWallet({
      type: WalletType.KEY_3,
      name: walletName,
      fastPublicKey: WALLETS_WITH_COINS[WalletType.KEY_3].FAST_KEY.PUBLIC_KEY,
      cancelPublicKey: WALLETS_WITH_COINS[WalletType.KEY_3].CANCEL_KEY.PUBLIC_KEY,
      seedPhrase: WALLETS_WITH_COINS[WalletType.KEY_3].SEED_PHRASE,
    });
  });

  describe('@ios @android @smoke', () => {
    it('should be possible to check details', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
      await expect(app.walletDetails.mainScreen.walletType).toBeVisible();
    });
  });

  describe('@ios @android @regression', () => {
    it('should be possible to rename the wallet', async () => {
      const newWalletName = 'xyz';

      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.renameWalletTo(newWalletName);
      await expect(app.walletDetails.mainScreen.walletName).toHaveText(newWalletName);
    });

    it('should be possible to check if wallet seed phrase is visible', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnExportWalletButton();

      await expect(app.walletDetails.exportWalletScreen.qrCode).toBeVisible();
      await expect(app.walletDetails.exportWalletScreen.seedPhrase).toBeVisible();
    });

    it('should be possible to check and copy the wallet XPUB', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnShowXpubButton();

      await expect(app.walletDetails.showXpubScreen.qrCode).toBeVisible();
      await expect(app.walletDetails.showXpubScreen.xpub).toBeVisible();

      await app.walletDetails.showXpubScreen.tapOnCopyButton();
      await expectToBeCopied();
    });

    it('should be possible to delete the wallet', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnDeleteWalletButton();
      await app.walletDetails.deleteScreen.confirm();

      await expect(app.walletDetails.deleteSuccessScreen.icon).toBeVisible();
    });

    it('should be possible to tap "No" and abort deleting wallet process', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await app.walletDetails.mainScreen.tapOnDeleteWalletButton();
      await app.walletDetails.deleteScreen.cancel();

      await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
    });

    it('should display "Subscribe to notifications" button if an email is added but wallet doesn\'t subscribe yet', async () => {});

    it('should display "Subscribe to notifications" button if an email address is not added yet', async () => {});

    it('should display "Unsubscribe to notifications" button if an email address is added and wallet subscribes it', async () => {});
  });
});
