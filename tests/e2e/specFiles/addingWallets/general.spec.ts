import { waitFor } from 'detox';

import { expectToBeDisabled } from '../../assertions';
import { isBeta } from '../../helpers/utils';
import app from '../../pageObjects';
import steps from '../../steps';
import { WalletType } from '../../types';

describe('Adding wallet', () => {
  describe('General', () => {
    beforeEach(async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());
      await app.developerRoom.tapOnSkipOnboardingButton();
      await app.onboarding.addEmailNotificationScreen.skip();
      await app.navigationBar.changeTab('wallets');
    });

    describe('@android @ios @regression', () => {
      it("shouldn't be possible to create a new wallet with empty name", async () => {
        await app.dashboard.dashboardScreen.tapOnAddWalletButton();

        await expectToBeDisabled(app.wallets.addNewWallet.createScreen.createWalletButton);
      });

      it("shouldn't be possible to import an existing wallet with empty name", async () => {
        await app.dashboard.dashboardScreen.tapOnAddWalletButton();

        await app.wallets.addNewWallet.createScreen.tapOnImportButton();
        await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

        await expectToBeDisabled(app.wallets.addNewWallet.createScreen.createWalletButton);
      });

      it.skip("shouldn't be possible to create a new wallet with name including special characters", async () => {
        await app.dashboard.dashboardScreen.tapOnAddWalletButton();

        await app.wallets.addNewWallet.createScreen.typeName('My-W@llet!');
        await app.wallets.addNewWallet.createScreen.tapOnCreateButton();
        await waitFor(app.wallets.addNewWallet.createScreen.nameValidationError)
          .toBeVisible()
          .withTimeout(20000);
      });

      it.skip("shouldn't be possible to import an existing wallet with name including special characters", async () => {
        await app.dashboard.dashboardScreen.tapOnAddWalletButton();

        await app.wallets.addNewWallet.createScreen.tapOnImportButton();
        await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

        await app.wallets.importWallet.importScreen.typeName('My-W@llet!');
        await waitFor(app.wallets.importWallet.importScreen.nameValidationError)
          .toBeVisible()
          .withTimeout(20000);
      });
    });

    describe('Non-unique wallet name', () => {
      describe('@android @ios @regression', () => {
        it("shouldn't be possible to create a new wallet with non-unique name", async () => {
          const walletName = 'My Wallet';

          await steps.createWallet({
            type: WalletType.S_HD_P2SH,
            name: walletName,
          });

          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

          await app.wallets.addNewWallet.createScreen.typeName(walletName);
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();
          await waitFor(app.wallets.addNewWallet.createScreen.nameValidationError)
            .toBeVisible()
            .withTimeout(20000);
        });

        it("shouldn't be possible to import an existing wallet with non-unique name", async () => {
          const walletName = 'My Wallet';

          await steps.createWallet({
            type: WalletType.S_HD_P2SH,
            name: walletName,
          });

          await app.dashboard.dashboardScreen.tapOnAddWalletButton();

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
