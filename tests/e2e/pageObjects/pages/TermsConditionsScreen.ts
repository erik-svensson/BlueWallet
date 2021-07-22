import { by, element } from 'detox';

import actions from '../../actions';
import { wait } from '../../helpers/utils';

const TermsConditionsScreen = () => ({
  termsConditions: element(by.id('terms-conditions-screen')),

  header: element(by.id('terms-and-conditions-title')),
  disagreeButton: element(by.id('disagree-button')),
  agreeButton: element(by.id('agree-button')),
  termsConditionsCheckbox: element(by.id('terms-and-conditions-checkbox')),
  privacyPolicyCheckbox: element(by.id('privacy-policy-checkbox')),
  popup: {
    noButton: element(by.id('modal-no')),
    yesButton: element(by.id('modal-yes')),
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

  async tapOnDisagreeButton() {
    await actions.tap(this.disagreeButton);
  },

  async tapYesOnModal() {
    await actions.tap(this.popup.yesButton);
  },

  async tapNoOnModal() {
    await actions.tap(this.popup.noButton);
  },

  // NOTE: Explicit wait cannot be avoided at the moment.
  // the T&C content is loaded asynchronously in the WebView component
  // and there is no possibility to wait for it to appear
  // This should be revisited if detox implements webview operations
  async waitUntilDisplayed() {
    await actions.waitForElement(this.header, 20 * 1000);
    await wait(5000);
  },
});

export default TermsConditionsScreen;
