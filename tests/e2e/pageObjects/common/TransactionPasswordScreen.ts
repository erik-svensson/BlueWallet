import { by, element } from 'detox';

import actions from '../../actions';

const TransactionPasswordScreen = () => ({
  passwordInput: element(by.id('transaction-password-input')),
  confirmPasswordButton: element(by.id('confirm-transaction-confirm-button')),

  async typePassword(password: string) {
    await actions.typeText(this.passwordInput, password);
  },

  async tapConfirmPasswordButton() {
    await actions.tap(this.confirmPasswordButton);
  },
});

export default TransactionPasswordScreen;
