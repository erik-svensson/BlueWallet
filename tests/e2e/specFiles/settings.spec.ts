import { expect } from 'detox';

import { isBeta } from '../helpers';
import app from '../pageObjects';
import { SupportedLanguage } from '../pageObjects/pages/settings/LanguageScreen';

const languages: SupportedLanguage[] = [
  'Chinese',
  'Spanish',
  'Indonesian',
  'Japanese',
  'Korean',
  'Portuguese',
  'Vietnamese',
  'Turkish',
];

describe('Settings', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.navigationBar.changeTab('settings');
  });

  describe('@android @ios @smoke', () => {
    it('should display Settings screen correctly', async () => {});
  });

  describe('@android @ios @regression', () => {
    languages.forEach(language =>
      it(`should be possible to change language from English to ${language}`, async () => {}),
    );

    it('should be possible to turn on advanced opions', async () => {});

    it('should be possible change PIN', async () => {});

    it('should display an error validation message if typed current PIN is incorrect', async () => {});

    it('should show "Application blocked" screen if number of attemps is exceeded', async () => {});

    it('should display an error validation message if typed confirmation PIN is incorrect', async () => {});

    it('should be possible to get access to About screen', async () => {});
  });

  describe('@ios @regression', () => {
    it('should be possible to enable biometric and unlock the app using biometric method', async () => {});

    it('should be possible to disable biometric and unlock the app using PIN', async () => {});
  });
});
