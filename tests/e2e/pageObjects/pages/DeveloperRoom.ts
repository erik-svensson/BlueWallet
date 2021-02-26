import { by, element } from 'detox';

import actions from '../../actions';

const DeveloperRoom = () => ({
  skipTermsConditionsButton: element(by.id('skip-terms-conditions-button')),
  skipOnboardingButton: element(by.id('skip-onboarding-button')),
  skipOnboardingWithEmailButton: element(by.id('skip-onboarding-with-email-button')),
  doNothingButton: element(by.id('close-chamber-button')),

  emailAddressInput: element(by.id('email-address-input')),

  async tapOnSkipTermsConditionsButton() {
    await actions.tap(this.skipTermsConditionsButton);
  },

  async tapOnSkipOnboardingButton() {
    await actions.tap(this.skipOnboardingButton);
  },

  async tapOnSkipOnboardingWithEmailButton() {
    await actions.tap(this.skipOnboardingWithEmailButton);
  },

  async tapOnDoNothingButton() {
    await actions.tap(this.doNothingButton);
  },

  async typeEmailAddress(email: string) {
    await actions.typeText(this.emailAddressInput, email, { replace: true });
  },
});

export default DeveloperRoom;
