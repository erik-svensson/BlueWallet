import { expect } from 'detox';

import { DEFAULT_UNLOCK_PIN, isBeta, WAIT_FOR_ELEMENT_TIMEOUT } from '../helpers';
import app from '../pageObjects';
import { SupportedLanguage } from '../pageObjects/pages/settings/LanguageScreen';

describe('Settings', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.navigationBar.changeTab('settings');
  });

  describe('@android @ios @smoke', () => {
    it('should display Settings screen correctly', async () => {
      expect(app.settings.settingsScreen.goldWalletIcon).toBeVisible();
    });
  });

  describe('@android @ios @regression', () => {
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

  describe('@ios @regression', () => {
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
          .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);
      }),
    );

    // TODO: For now, it's not possible to test it. Requires changes in the app
    xit('should be possible to enable biometric and unlock the app using biometric method', async () => {});

    // TODO: For now, it's not possible to test it. Requires changes in the app
    xit('should be possible to disable biometric and unlock the app using PIN', async () => {});
  });
});
