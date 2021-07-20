import { expect } from 'detox';

import { ECDSA_KEYS, WALLETS } from '../../helpers/consts';
import { isBeta } from '../../helpers/utils';
import app from '../../pageObjects';
import { WalletType } from '../../types';

describe('Adding wallet', () => {
  describe('Without subscribing to the notifications', () => {
    beforeEach(async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());
      await app.developerRoom.tapOnSkipOnboardingButton();
      await app.onboarding.addEmailNotificationScreen.skip();
      await app.navigationBar.changeTab('wallets');
    });

    describe('Create', () => {
      const walletName = 'My Wallet';

      describe('@android @ios @smoke', () => {
        it('should be possible to create a new 3-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.typeName(walletName);
          await app.wallets.addNewWallet.createScreen.chooseType(WalletType.KEY_3);
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.FAST_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();
          const seed = await app.wallets.addNewWallet.seedScreen.getSeed();

          await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
          await app.wallets.addNewWallet.confirmSeedScreen.confirmSeed(seed);
          await app.wallets.addNewWallet.successScreen.close();

          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });
      });

      describe('@android @ios @regression', () => {
        it('should be possible to create a new 2-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.typeName(walletName);
          await app.wallets.addNewWallet.createScreen.chooseType(WalletType.KEY_2);
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();
          const seed = await app.wallets.addNewWallet.seedScreen.getSeed();

          await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
          await app.wallets.addNewWallet.confirmSeedScreen.confirmSeed(seed);
          await app.wallets.addNewWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        it('should be possible to create a new Standard HD P2SH wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.typeName(walletName);
          await app.wallets.addNewWallet.createScreen.chooseType(WalletType.S_HD_P2SH);
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();
          const seed = await app.wallets.addNewWallet.seedScreen.getSeed();

          await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
          await app.wallets.addNewWallet.confirmSeedScreen.confirmSeed(seed);
          await app.wallets.addNewWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        describe('Advanced wallets', () => {
          beforeEach(async () => {
            await app.navigationBar.changeTab('settings');
            await app.settings.settingsScreen.tapOnAdvancedOptions();
            await app.settings.advancedOptionsScreen.tapOnAdvancedOptionsSwitch();
            await app.header.tapOnBackButton();
            await app.navigationBar.changeTab('wallets');
          });

          it('should be possible to create a new Standard P2SH wallet', async () => {
            await app.dashboard.dashboardScreen.tapOnAddWalletButton();

            await app.wallets.addNewWallet.createScreen.typeName(walletName);
            await app.wallets.addNewWallet.createScreen.chooseType(WalletType.S_P2SH);
            await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

            await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();
            await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
            await app.wallets.addNewWallet.successScreen.close();
            await app.dashboard.dashboardScreen.scrollToWallet(walletName);
            await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
          });

          it('should be possible to create a new Standard HD SegWit wallet', async () => {
            await app.dashboard.dashboardScreen.tapOnAddWalletButton();

            await app.wallets.addNewWallet.createScreen.typeName(walletName);
            await app.wallets.addNewWallet.createScreen.chooseType(WalletType.S_HD_SEGWIT);
            await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

            await app.wallets.addNewWallet.seedScreen.waitUntilDisplayed();
            const seed = await app.wallets.addNewWallet.seedScreen.getSeed();

            await app.wallets.addNewWallet.seedScreen.tapOnCloseButton();
            await app.wallets.addNewWallet.confirmSeedScreen.confirmSeed(seed);
            await app.wallets.addNewWallet.successScreen.close();
            await app.dashboard.dashboardScreen.scrollToWallet(walletName);
            await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
          });
        });
      });
    });

    describe('Import', () => {
      const walletName = 'My Imported Wallet';

      describe('@android @ios @smoke', () => {
        it('should be possible to import an existing 3-Key Vault wallet by typing seed phrase', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.KEY_3);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS[WalletType.KEY_3].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_3].FAST_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_3].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });
      });

      describe('@android @ios @regression', () => {
        it('should be possible to import an existing 3-Key Vault wallet by scaning QR code', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.KEY_3);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS[WalletType.KEY_3].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_3].FAST_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_3].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        it('should be possible to import an existing 2-Key Vault wallet by typing seed phrase', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.KEY_2);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS[WalletType.KEY_2].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_2].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        it('should be possible to import an existing 2-Key Vault wallet by scaning QR code', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.KEY_2);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS[WalletType.KEY_2].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS[WalletType.KEY_2].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        it('should be possible to import an existing Standard wallet by typing seed phrase', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.S_HD_P2SH);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS[WalletType.S_HD_P2SH].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });

        it('should be possible to import an existing Standard wallet by scaning QR code', async () => {
          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType(WalletType.S_HD_P2SH);
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName(walletName);
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS[WalletType.S_HD_P2SH].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();

          await app.wallets.importWallet.successScreen.close();
          await app.dashboard.dashboardScreen.scrollToWallet(walletName);
          await expect(app.dashboard.dashboardScreen.getWalletCardElement(walletName)).toBeVisible();
        });
      });
    });
  });
});
