import { waitFor } from 'detox';

import gmailClient from '../../gmail';
import { DEFAULT_EMAIL_ADDRESS, ECDSA_KEYS, WALLETS } from '../../helpers/consts';
import { isBeta, randomizeEmailAddress } from '../../helpers/utils';
import app from '../../pageObjects';

describe('Adding wallet', () => {
  describe('With subscribing to the notifications', () => {
    // TODO: There must be better way to do it, without modifying the local variable
    let emailAddress: string;

    beforeEach(async () => {
      emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

      isBeta() && (await app.onboarding.betaVersionScreen.close());
      await app.developerRoom.typeEmailAddress(emailAddress);
      await app.developerRoom.tapOnSkipOnboardingWithEmailButton();
      await app.navigationBar.changeTab('wallets');
    });

    describe('Create', () => {
      describe('@android @ios @smoke', () => {
        //FIX EMAIL FETCH AFTER FINAL TEMPLATE AGREED
        xit('should be possible to create a new 3-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('3-Key Vault');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.FAST_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();

          await app.wallets.addNewWallet.successScreen.tapOnCloseButton();
          await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

          const code = await gmailClient.getActionVerificationCode({ receiver: emailAddress });

          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

          await waitFor(app.wallets.subscribeToEmailNotifications.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });

      describe('@android @ios @regression', () => {
        it('should be possible to create a new 2-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('2-Key Vault');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.addNewWallet.scanQrCodeScreen.scanCustomString(ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY);

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();

          await app.wallets.addNewWallet.successScreen.tapOnCloseButton();
          await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

          const code = await gmailClient.getActionVerificationCode({ receiver: emailAddress });

          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

          await waitFor(app.wallets.subscribeToEmailNotifications.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });

        it('should be possible to create a new Standard HD P2SH wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.typeName('My Wallet');
          await app.wallets.addNewWallet.createScreen.chooseType('Standard HD P2SH');
          await app.wallets.addNewWallet.createScreen.tapOnCreateButton();

          await app.wallets.addNewWallet.loadingScreen.waitUntilEnded();

          await app.wallets.addNewWallet.successScreen.tapOnCloseButton();
          await app.wallets.subscribeToEmailNotifications.getNotificationsScreen.tapOnYes();

          const code = await gmailClient.getActionVerificationCode({ receiver: emailAddress });

          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.typeCode(code);
          await app.wallets.subscribeToEmailNotifications.verifyActionScreen.submit();

          await waitFor(app.wallets.subscribeToEmailNotifications.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });
    });

    // TODO: Automating this flow requires a lot more work. First of all, you must make sure that the wallets are unsubscribed
    // after each test. But still, you can't be sure it's enough - it might happen that while executing the test, in the moment
    // between when the wallet already subscribed to the notifications but before executing afterEach() block. In that case, the
    // tests will constantly failing until someone would not fix it.
    describe.skip('Import', () => {
      describe('@android @ios @smoke', () => {
        it('should be possible to import an existing 3-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('3-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS['3-Key Vault'].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addFastKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(WALLETS['3-Key Vault'].FAST_KEY.PUBLIC_KEY);

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['3-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });
      });

      describe('@android @ios @regression', () => {
        it('should be possible to import an existing 2-Key Vault wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

          await app.wallets.addNewWallet.createScreen.tapOnImportButton();
          await app.wallets.importWallet.chooseWalletTypeScreen.chooseType('2-Key Vault');
          await app.wallets.importWallet.chooseWalletTypeScreen.tapOnProceedButton();

          await app.wallets.importWallet.importScreen.typeName('My Imported Wallet');
          await app.wallets.importWallet.importScreen.typeSeedPhrase(WALLETS['2-Key Vault'].SEED_PHRASE);
          await app.wallets.importWallet.importScreen.submit();

          await app.wallets.importWallet.addCancelKeyScreen.tapScanOnQrCode();
          await app.wallets.importWallet.scanQrCodeScreen.scanCustomString(
            WALLETS['2-Key Vault'].CANCEL_KEY.PUBLIC_KEY,
          );

          await app.wallets.importWallet.loadingScreen.waitUntilEnded();
          await waitFor(app.wallets.importWallet.successScreen.icon)
            .toBeVisible()
            .withTimeout(20000);
        });

        it('should be possible to import an existing Standard wallet', async () => {
          await app.dashboard.dashboardScreen.tapOnAddButton();

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
      });
    });
  });
});
