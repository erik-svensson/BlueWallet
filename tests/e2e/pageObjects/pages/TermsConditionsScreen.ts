import { by, element } from 'detox';

import actions from '../../actions';

const TermsConditionsScreen = () => ({
  termsConditions: element(by.id('terms-conditions-screen')),

  disagreeButton: element(by.id('disagree-button')),
  agreeButton: element(by.id('agree-button')),
  termsConditionsCheckbox: element(by.id('terms-and-conditions-checkbox')),
  privacyPolicyCheckbox: element(by.id('privacy-policy-checkbox')),
  popup: {
    noButton: element(by.id('')),
    yesButton: element(by.id('')),
  },

  async scrollDown() {
    await this.termsConditions.scrollTo('bottom');
  },

  async tapOnAgreementCheckboxes() {
    await actions.tap(this.termsConditionsCheckbox);
    await actions.tap(this.privacyPolicyCheckbox);
  },

  async tapOnAgreeButton() {
    await actions.tap(this.agreeButton);
  },
});

export default TermsConditionsScreen;
