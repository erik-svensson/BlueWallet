import { by, element } from 'detox';

import actions from '../../actions';

const DeveloperRoom = () => ({
  skipTermsConditionsButton: element(by.id('skip-terms-conditions-button')),
  skipOnboardingButton: element(by.id('skip-onboarding-button')),
  doNothingButton: element(by.id('close-chamber-button')),

  async tapOnSkipTermsConditionsButton() {
    await actions.tap(this.skipTermsConditionsButton);
  },

  async tapOnSkipOnboardingButton() {
    await actions.tap(this.skipOnboardingButton);
  },

  async tapOnDoNothingButton() {
    await actions.tap(this.doNothingButton);
  },
});

export default DeveloperRoom;
