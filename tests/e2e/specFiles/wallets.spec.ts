import { expect, waitFor } from 'detox';

import { expectToBeDisabled } from '../assertions';
import { isBeta, ECDSA_KEYS, WALLETS } from '../helpers';
import app from '../pageObjects';

describe('Wallets', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.navigationBar.changeTab('wallets');
  });

  describe('Dashboard', () => {
    describe('@android @ios @smoke', () => {
      it('should display an empty list if there is no wallets added yet', async () => {
        await expect(app.wallets.dashboardScreen.noWalletsIcon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      xit('should be possible to display details of wallet', async () => {});
    });
  });

  describe('Adding wallet', () => {
    describe('3-Key Vault', () => {
      describe('@android @ios @smoke', () => {
        it('should be possible to create a new 3-Key Vault wallet', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('3-Key Vault');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.FAST_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.addNewWallet.successScreen.mnemonic)
            .toBeVisible()
            .withTimeout(20000);
        });
      });

      describe('@android @ios @regression', () => {
        // TODO: Unskip it once BTCV2-1279 is solved
        xit('should be possible to import an existing 3-Key Vault wallet by using seed phrase', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('3-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS['3-Keys Vault'].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['3-Keys Vault'].FAST_KEY.PUBLIC_KEY);

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['3-Keys Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });

        // TODO: Unskip it once BTCV2-1279 is solved
        xit('should be possible to import an existing 3-Key Vault wallet by scaning QR code', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('3-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['3-Keys Vault'].SEED_PHRASE);

          await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['3-Keys Vault'].FAST_KEY.PUBLIC_KEY);

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['3-Keys Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });
    });

    describe('2-Key Vault', () => {
      describe('@android @ios @regression', () => {
        it('should be possible to create a new 2-Key Vault wallet', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('2-Key Vault');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.addNewWallet.successScreen.mnemonic)
            .toBeVisible()
            .withTimeout(20000);
        });

        // TODO: Unskip it once BTCV2-1279 is solved
        xit('should be possible to import an existing 2-Key Vault wallet by using seed phrase', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('2-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS['2-Keys Vault'].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['2-Keys Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });

        // TODO: Unskip it once BTCV2-1279 is solved
        xit('should be possible to import an existing 2-Key Vault wallet by scaning QR code', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('2-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['2-Keys Vault'].SEED_PHRASE);

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['2-Keys Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });
    });

    describe('Standard HD P2SH', () => {
      describe('@android @ios @regression', () => {
        it('should be possible to create a new Standard HD P2SH wallet', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('Standard HD P2SH');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.addNewWallet.successScreen.mnemonic)
            .toBeVisible()
            .withTimeout(20000);
        });

        it('should be possible to import an existing Standard wallet by using seed phrase', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('Standard HD P2SH');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS['Standard HD P2SH'].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });

        it('should be possible to import an existing Standard wallet by scaning QR code', async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('Standard HD P2SH');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['Standard HD P2SH'].SEED_PHRASE);

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });
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
        await app.wallets.dashboardScreen.tapOnAddButton();

        await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
        await app.wallets.addNewWallet.createScreen.chooseType('Standard P2SH');
        await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

        await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
        await waitFor(app.wallets.addNewWallet.successScreen.mnemonic)
          .toBeVisible()
          .withTimeout(20000);
      });

      it('should be possible to create a new Standard HD SegWit wallet', async () => {
        await app.wallets.dashboardScreen.tapOnAddButton();

        await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
        await app.wallets.addNewWallet.createScreen.chooseType('Standard HD SegWit');
        await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

        await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();
        await waitFor(app.wallets.addNewWallet.successScreen.mnemonic)
          .toBeVisible()
          .withTimeout(20000);
      });
    });

    describe('General', () => {
      describe('@android @ios @regression', () => {
        it("shouldn't be possible to create a new wallet with empty name", async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await expectToBeDisabled(app.wallets.addNewWallet.createScreen.createWalletButton);
        });

        it("shouldn't be possible to import an existing wallet with empty name", async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await expectToBeDisabled(app.wallets.addNewWallet.createScreen.createWalletButton);
        });

        it("shouldn't be possible to create a new wallet with name including special characters", async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My-Wallet!');
          await waitFor(app.wallets.addNewWallet.createScreen.nameValidationError)
            .toBeVisible()
            .withTimeout(20000);
        });

        it("shouldn't be possible to import an existing wallet with name including special characters", async () => {
          await app.wallets.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await waitFor(app.wallets.importWallet.importScreen.nameValidationError)
            .toBeVisible()
            .withTimeout(20000);
        });

        describe('', () => {
          const walletName = 'My Wallet';

          beforeEach(async () => {
            await app.wallets.createWallet({
              type: 'Standard HD P2SH',
              name: walletName,
            });
          });

          it("shouldn't be possible to create a new wallet with non-unique name", async () => {
            await app.wallets.dashboardScreen.tapOnAddButton();

            await app.wallets.addNewWallet.createScreen.typeName(walletName);
            await waitFor(app.wallets.addNewWallet.createScreen.nameValidationError)
              .toBeVisible()
              .withTimeout(20000);
          });

          it("shouldn't be possible to import an existing wallet with non-unique name", async () => {
            await app.wallets.dashboardScreen.tapOnAddButton();

            await app.wallets.addNewWallet.createScreen.tapOnImportButton();
            await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

            await app.wallets.importWallet.importScreen.typeName(walletName);
            await waitFor(app.wallets.importWallet.importScreen.nameValidationError)
              .toBeVisible()
              .withTimeout(20000);
          });
        });
      });
    });
  });

  xdescribe('Details', () => {});
});
