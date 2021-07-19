import { expect as jestExpect } from '@jest/globals';
import { expect, waitFor } from 'detox';

import gmailClient from '../gmail';
import { DEFAULT_EMAIL_ADDRESS, DEFAULT_UNLOCK_PIN, ECDSA_KEYS, WAIT_FOR_ELEMENT_TIMEOUT } from '../helpers/consts';
import { isBeta, randomizeEmailAddress } from '../helpers/utils';
import app from '../pageObjects';
import { SupportedLanguage } from '../pageObjects/pages/settings/LanguageScreen';
import steps from '../steps';

describe('Settings', () => {
  describe('General', () => {
    beforeEach(async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());
      await app.developerRoom.tapOnSkipOnboardingButton();
      await app.onboarding.addEmailNotificationScreen.skip();
      await app.navigationBar.changeTab('settings');
    });

    describe('@android @ios @smoke', () => {
      it('should display Settings screen correctly', async () => {
        expect(app.settings.settingsScreen.goldWalletIcon).toBeVisible();
      });
    });

    describe.skip('@regression', () => {
      describe('@android @ios', () => {
        it('should be possible to turn on advanced options', async () => {
          await app.settings.settingsScreen.tapOnAdvancedOptions();
          await app.settings.advancedOptionsScreen.tapOnAdvancedOptionsSwitch();

          await app.header.tapOnBackButton();
          await app.navigationBar.changeTab('wallets');

          await app.dashboard.dashboardScreen.tapOnAddButton();

          await expect(app.wallets.addNewWallet.createScreen.walletTypeRadios['Standard HD P2SH']).toBeVisible();
          await expect(app.wallets.addNewWallet.createScreen.walletTypeRadios['Standard HD SegWit']).toBeVisible();
          await expect(app.wallets.addNewWallet.createScreen.walletTypeRadios['Standard P2SH']).toBeVisible();
        });

        it('should be possible change PIN', async () => {
          await app.settings.settingsScreen.tapOnChangePin();

          await app.settings.changePin.currentPinScreen.typePin(DEFAULT_UNLOCK_PIN);
          await app.settings.changePin.newPinScreen.typePin('1111');
          await app.settings.changePin.confirmPinScreen.typePin('1111');

          // TODO: Add more assertions
          await expect(app.settings.changePin.successScreen.icon).toBeVisible();
        });

        it('should display an error validation message if typed current PIN is incorrect', async () => {
          await app.settings.settingsScreen.tapOnChangePin();
          await app.settings.changePin.currentPinScreen.typePin('0000');

          await expect(app.settings.changePin.currentPinScreen.pinValidationError).toBeVisible();
        });

        it('should show "Application blocked" screen if number of attemps is exceeded', async () => {
          await app.settings.settingsScreen.tapOnChangePin();

          await app.settings.changePin.currentPinScreen.typePin('0000');
          await app.settings.changePin.currentPinScreen.typePin('0000');
          await app.settings.changePin.currentPinScreen.typePin('0000');

          await expect(app.settings.changePin.applicationBlockedScreen.header).toBeVisible();
        });

        it('should display an error validation message if typed confirmation PIN is incorrect', async () => {
          await app.settings.settingsScreen.tapOnChangePin();

          await app.settings.changePin.currentPinScreen.typePin(DEFAULT_UNLOCK_PIN);
          await app.settings.changePin.newPinScreen.typePin('1111');
          await app.settings.changePin.confirmPinScreen.typePin('1000');

          await expect(app.settings.changePin.confirmPinScreen.pinValidationError).toBeVisible();
        });

        it('should be possible to get access to About screen', async () => {
          await app.settings.settingsScreen.tapOnAboutUs();

          await expect(app.settings.aboutUsScreen.goToOurGithubButton).toBeVisible();
        });
      });

      describe('@ios', () => {
        const walletsInLocalLanguages: { [key in Exclude<SupportedLanguage, 'English'>]: string } = {
          Chinese: '钱包',
          Spanish: 'Monederos',
          Indonesian: 'Dompet',
          Japanese: 'ウォレット',
          Korean: '지갑',
          Portuguese: 'Carteiras',
          Vietnamese: 'Ví',
          Turkish: 'Cüzdanlar',
        };

        Object.keys(walletsInLocalLanguages).forEach(language =>
          xit(`should be possible to change language from English to ${language}`, async () => {
            await app.settings.settingsScreen.tapOnLanguage();
            await app.settings.languageScreen.chooseLanguage(language as SupportedLanguage);
            await app.settings.languageScreen.confirmLanguageChange();

            // TODO: To make it working, use element.getAttributes('title'). It's supported only for iOS and Detox must be upgraded first
            await waitFor(app.dashboard.dashboardScreen.header)
              .toHaveText(walletsInLocalLanguages[language])
              .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT.DEFAULT);
          }),
        );

        // TODO: For now, it's not possible to test it. Requires changes in the app
        xit('should be possible to enable biometric and unlock the app using biometric method', async () => {});

        // TODO: For now, it's not possible to test it. Requires changes in the app
        xit('should be possible to disable biometric and unlock the app using PIN', async () => {});
      });
    });
  });

  describe('Email notifications', () => {
    describe('Add email', () => {
      beforeEach(async () => {
        isBeta() && (await app.onboarding.betaVersionScreen.close());
        await app.developerRoom.tapOnSkipOnboardingButton();
        await app.onboarding.addEmailNotificationScreen.skip();
        await app.navigationBar.changeTab('settings');
      });

      describe('@android @ios @smoke', () => {
        it('should display the "Add your email address" if a user skipped this step on onboarding', async () => {
          await app.settings.settingsScreen.tapOnEmailNotifications();

          await expect(app.settings.emailNotifications.noEmailAddedScreen.noEmailAddressIcon).toBeVisible();
        });
      });

      describe('@android @ios @regression', () => {
        it('should be possible to add an email address if a user skipped this step on onboarding', async () => {
          const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.settings.settingsScreen.tapOnEmailNotifications();
          await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

          await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
          await app.settings.emailNotifications.addEmailAddressScreen.submit();

          const code = await gmailClient.getEmailVerificationCode({ receiver: email });

          await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode(code);
          await app.settings.emailNotifications.confirmEmailAddressScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        it('should be possible to add an email address and subscribe a wallet to notifications', async () => {
          const walletName = 'Goofy wallet';

          await steps.createWallet({
            type: '3-Key Vault',
            name: walletName,
            fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
            cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
          });

          await app.navigationBar.changeTab('settings');

          const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.settings.settingsScreen.tapOnEmailNotifications();
          await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

          await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
          await app.settings.emailNotifications.addEmailAddressScreen.submit();

          await app.settings.emailNotifications.getNotificationsScreen.selectWallet(walletName);
          await app.settings.emailNotifications.getNotificationsScreen.tapOnConfirmButton();

          const code = await gmailClient.getActionVerificationCode({ receiver: email });

          await app.settings.emailNotifications.verifyActionScreen.typeCode(code);
          await app.settings.emailNotifications.verifyActionScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        it('should be possible to add an email address and subscribe multiple wallets to notifications', async () => {
          await steps.createWallet({
            type: '3-Key Vault',
            name: 'Main',
            fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
            cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
          });

          // TODO: Un-comment it once BTCV2-1515 is solved.
          // await steps.createWallet({
          //   type: '3-Key Vault',
          //   name: 'Secondary',
          //   fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
          //   cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
          // });

          const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.navigationBar.changeTab('settings');

          await app.settings.settingsScreen.tapOnEmailNotifications();
          await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

          await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
          await app.settings.emailNotifications.addEmailAddressScreen.submit();

          await app.settings.emailNotifications.getNotificationsScreen.selectAllWallets();
          await app.settings.emailNotifications.getNotificationsScreen.tapOnConfirmButton();

          const code = await gmailClient.getActionVerificationCode({ receiver: email });

          await app.settings.emailNotifications.verifyActionScreen.typeCode(code);
          await app.settings.emailNotifications.verifyActionScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        it('should be possible to add an email address and without subscribing to notifications if a wallet exists', async () => {
          await steps.createWallet({
            type: '3-Key Vault',
            name: 'Main',
            fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
            cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
          });

          const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.navigationBar.changeTab('settings');

          await app.settings.settingsScreen.tapOnEmailNotifications();
          await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

          await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
          await app.settings.emailNotifications.addEmailAddressScreen.submit();

          await app.settings.emailNotifications.getNotificationsScreen.tapOnSkipButton();

          const code = await gmailClient.getEmailVerificationCode({ receiver: email });

          await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode(code);
          await app.settings.emailNotifications.confirmEmailAddressScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });
      });
    });

    describe('Change email address', () => {
      // TODO: There must be better way to do it, without modifying the local variable
      let emailAddress: string;

      beforeEach(async () => {
        emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

        isBeta() && (await app.onboarding.betaVersionScreen.close());
        await app.developerRoom.typeEmailAddress(emailAddress);
        await app.developerRoom.tapOnSkipOnboardingWithEmailButton();
        await app.navigationBar.changeTab('settings');
      });

      describe('@android @ios @regression', () => {
        it('should be possible to change the email address without having any wallets added', async () => {
          const newEmail = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.settings.settingsScreen.tapOnEmailNotifications();

          await app.settings.emailNotifications.configureNotificationsScreen.tapOnChangeEmailButton();
          await app.settings.emailNotifications.changeEmailScreen.typeEmail(newEmail);
          await app.settings.emailNotifications.changeEmailScreen.submit();

          const code = await gmailClient.getEmailVerificationCode({ receiver: newEmail });

          await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode(code);
          await app.settings.emailNotifications.confirmEmailAddressScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        it('should be possible to change the email address and change wallets subscriptions', async () => {
          const newEmail = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          await app.settings.settingsScreen.tapOnEmailNotifications();

          await app.settings.emailNotifications.configureNotificationsScreen.tapOnChangeEmailButton();
          await app.settings.emailNotifications.changeEmailScreen.typeEmail(newEmail);
          await app.settings.emailNotifications.changeEmailScreen.submit();

          const code = await gmailClient.getEmailVerificationCode({ receiver: newEmail });

          await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode(code);
          await app.settings.emailNotifications.confirmEmailAddressScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });
      });
    });

    describe('Remove email address', () => {
      // TODO: There must be better way to do it, without modifying the local variable
      let emailAddress: string;

      beforeEach(async () => {
        emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

        isBeta() && (await app.onboarding.betaVersionScreen.close());
        await app.developerRoom.typeEmailAddress(emailAddress);
        await app.developerRoom.tapOnSkipOnboardingWithEmailButton();
        await app.navigationBar.changeTab('settings');
      });

      describe('@android @ios @regression', () => {
        it('should be possible to remove the email address without having any wallets added', async () => {
          await app.settings.settingsScreen.tapOnEmailNotifications();

          await app.settings.emailNotifications.configureNotificationsScreen.tapOnDeleteEmailButton();
          await app.settings.emailNotifications.deleteScreen.confirm();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        // TODO: Fix this. It doesn't work because getActionVerificationCode() reads the previous email and uses invalid code
        it.skip('should be possible to remove the email address and unsubscribe a wallet from notifications', async () => {
          const walletName = 'Goofy wallet';

          await steps.createWallet({
            type: '3-Key Vault',
            name: walletName,
            fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
            cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
            emailAddress,
          });

          await app.navigationBar.changeTab('settings');

          await app.settings.settingsScreen.tapOnEmailNotifications();

          await app.settings.emailNotifications.configureNotificationsScreen.tapOnDeleteEmailButton();
          await app.settings.emailNotifications.deleteScreen.confirm();

          await app.settings.emailNotifications.getNotificationsScreen.selectWallet(walletName);
          await app.settings.emailNotifications.getNotificationsScreen.tapOnConfirmButton();

          const code = await gmailClient.getActionVerificationCode({ receiver: emailAddress });

          await app.settings.emailNotifications.verifyActionScreen.typeCode(code);
          await app.settings.emailNotifications.verifyActionScreen.submit();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });

        it("should be possible to remove the email address and not change the wallet's notifications", async () => {
          await steps.createWallet({
            type: '3-Key Vault',
            name: 'Goofy wallet',
            fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
            cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
            emailAddress,
          });

          await app.navigationBar.changeTab('settings');

          await app.settings.settingsScreen.tapOnEmailNotifications();

          await app.settings.emailNotifications.configureNotificationsScreen.tapOnDeleteEmailButton();
          await app.settings.emailNotifications.deleteScreen.confirm();

          await app.settings.emailNotifications.getNotificationsScreen.tapOnSkipButton();

          await expect(app.settings.emailNotifications.successScreen.icon).toBeVisible();
        });
      });
    });

    describe('General', () => {
      describe('Without added email', () => {
        beforeEach(async () => {
          isBeta() && (await app.onboarding.betaVersionScreen.close());
          await app.developerRoom.tapOnSkipOnboardingButton();
          await app.onboarding.addEmailNotificationScreen.skip();
          await app.navigationBar.changeTab('settings');
        });

        describe('@android @ios @regression', () => {
          it('should be possible to resend the code', async () => {
            const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

            await app.settings.settingsScreen.tapOnEmailNotifications();
            await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

            await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
            await app.settings.emailNotifications.addEmailAddressScreen.submit();

            await gmailClient.getEmailVerificationCode({ receiver: email });

            await app.settings.emailNotifications.confirmEmailAddressScreen.tapOnResendButton();

            const code = await gmailClient.getEmailVerificationCode({ receiver: email });

            jestExpect(code).toBeDefined();
          });

          it('should be displayed an error message if typed email address is invalid ', async () => {
            await app.settings.settingsScreen.tapOnEmailNotifications();
            await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

            await app.settings.emailNotifications.addEmailAddressScreen.typeEmail('invalidemail.co');
            await app.settings.emailNotifications.addEmailAddressScreen.submit();

            await expect(app.settings.emailNotifications.addEmailAddressScreen.emailValidationError).toBeVisible();
          });

          it('should be displayed an error message if typed code is invalid', async () => {
            const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

            await app.settings.settingsScreen.tapOnEmailNotifications();
            await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

            await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
            await app.settings.emailNotifications.addEmailAddressScreen.submit();

            await gmailClient.getEmailVerificationCode({ receiver: email });

            await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode('1111');
          });

          it('should be displayed an error message and send a code if exceeded a limit of attempts of sending codes', async () => {
            const email = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

            await app.settings.settingsScreen.tapOnEmailNotifications();
            await app.settings.emailNotifications.noEmailAddedScreen.tapOnTapEmailButton();

            await app.settings.emailNotifications.addEmailAddressScreen.typeEmail(email);
            await app.settings.emailNotifications.addEmailAddressScreen.submit();

            await gmailClient.getEmailVerificationCode({ receiver: email });

            await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode('1111');
            await app.settings.emailNotifications.confirmEmailAddressScreen.submit();
            await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode('2222');
            await app.settings.emailNotifications.confirmEmailAddressScreen.submit();
            await app.settings.emailNotifications.confirmEmailAddressScreen.typeCode('3333');
            await app.settings.emailNotifications.confirmEmailAddressScreen.submit();

            const code = await gmailClient.getEmailVerificationCode({ receiver: email });

            await expect(
              app.settings.emailNotifications.confirmEmailAddressScreen.pincodeValidationError,
            ).toBeVisible();
            // TODO: Probably this test should be improved because now you can't be sure that the code is taken from the email
            // that has been sent after the last attempt. One way would be marking as read an email after read but it doesn't seem
            // to be a completely bulletproof solution. As Olek suggested, it'd be better to add a label "Used".
            jestExpect(code).toBeDefined();
          });
        });
      });

      describe('With added email', () => {
        // TODO: There must be better way to do it, without modifying the local variable
        let emailAddress: string;

        beforeEach(async () => {
          emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

          isBeta() && (await app.onboarding.betaVersionScreen.close());
          await app.developerRoom.typeEmailAddress(emailAddress);
          await app.developerRoom.tapOnSkipOnboardingWithEmailButton();
          await app.navigationBar.changeTab('settings');
        });

        describe('@android @ios @regression', () => {
          it('should be possible to get access to the wallet details from Email Notifications settings', async () => {
            const walletName = 'Goofy wallet';

            await steps.createWallet({
              type: '3-Key Vault',
              name: walletName,
              fastPublicKey: ECDSA_KEYS.FAST_KEY.PUBLIC_KEY,
              cancelPublicKey: ECDSA_KEYS.CANCEL_KEY.PUBLIC_KEY,
              emailAddress,
            });

            await app.navigationBar.changeTab('settings');

            await app.settings.settingsScreen.tapOnEmailNotifications();
            await app.settings.emailNotifications.configureNotificationsScreen.tapOnWalletItem(walletName);

            await expect(app.walletDetails.mainScreen.walletName).toBeVisible();
          });
        });
      });
    });
  });
});
