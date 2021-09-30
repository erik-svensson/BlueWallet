import { expect } from 'detox';

import { expectToBeCopied, expectElementWithTextToBeVisible } from '../assertions';
import { walletsData } from '../data';
import { isBeta } from '../helpers/utils';
import mailing from '../mailing';
import app from '../pageObjects';
import steps from '../steps';
import { WalletType } from '../types';

describe('Wallet details', () => {
  const walletName = 'Scrooge McDuck wallet';

  describe('@ios @android @smoke', () => {
    beforeEach(async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());

      await app.developerRoom.tapOnSkipOnboardingButton();
      await app.onboarding.addEmailNotificationScreen.skip();
      await app.airdrop.dashboard.skipIfActive();
      await steps.importWallet({
        type: WalletType.KEY_3,
        name: walletName,
        secrets: walletsData.frozenTxWallets[WalletType.KEY_3],
      });
    });
    it('should be possible to check details', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);

      await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
      await expect(app.walletDetails.mainScreen.walletType).toBeVisible();
    });
  });

  describe('@ios @android @regression', () => {
    beforeEach(async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());

      await app.developerRoom.tapOnSkipOnboardingButton();
      await app.onboarding.addEmailNotificationScreen.skip();
      await steps.importWallet({
        type: WalletType.KEY_3,
        name: walletName,
        secrets: walletsData.frozenTxWallets[WalletType.KEY_3],
      });
    });
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

    it('should display "Subscribe to notifications" button if an email address is not added yet', async () => {
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);
      await expect(app.walletDetails.mainScreen.manageSubscriptionButton).toBeVisible();
      await expectElementWithTextToBeVisible('Subscribe to email notifications');
    });
  });

  describe('@ios @android @regression', () => {
    let emailAddress: string;

    beforeEach(async () => {
      emailAddress = mailing.generateAddress();
      isBeta() && (await app.onboarding.betaVersionScreen.close());
      await app.developerRoom.typeEmailAddress(emailAddress);
      await app.developerRoom.tapOnSkipOnboardingWithEmailButton();
    });

    it('should display "Subscribe to notifications" button if an email is added but wallet doesn\'t subscribe yet', async () => {
      await steps.importWallet({
        type: WalletType.KEY_3,
        name: walletName,
        secrets: walletsData.frozenTxWallets[WalletType.KEY_3],
        skipEmailSubscription: true,
      });
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);
      await expect(app.walletDetails.mainScreen.manageSubscriptionButton).toBeVisible();
      await expectElementWithTextToBeVisible('Subscribe to email notifications');
    });

    it('should display "Unsubscribe to notifications" button if an email address is added and wallet subscribes it', async () => {
      await steps.importWallet({
        type: WalletType.KEY_3,
        name: walletName,
        secrets: walletsData.frozenTxWallets[WalletType.KEY_3],
        emailAddress,
      });
      await app.dashboard.dashboardScreen.tapOnWalletDetailsButton(walletName);
      await expect(app.walletDetails.mainScreen.manageSubscriptionButton).toBeVisible();
      await expectElementWithTextToBeVisible('Unsubscribe from email notifications');
    });
  });
});
