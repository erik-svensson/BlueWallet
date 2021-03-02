import { by, element } from 'detox';

import actions from '../../../actions';
import DeleteScreen from '../../common/DeleteScreen';
import MessageScreen from '../../common/MessageScreen';

const EmailNotifications = () => ({
  noEmailAddedScreen: {
    noEmailAddressIcon: element(by.id('no-email-address-icon')),
    addEmailButton: element(by.id('add-email-button')),

    async tapOnTapEmailButton() {
      await actions.tap(this.addEmailButton);
    },
  },

  configureNotificationsScreen: {
    emailAddressText: element(by.id('current-email-text')),

    changeEmailButton: element(by.id('change-email-button')),
    deleteEmailButton: element(by.id('delete-email-button')),

    async tapOnWalletItem(walletName: string) {
      const walletItemElement = element(by.id(`wallet-${walletName}-item`));

      await actions.tap(walletItemElement);
    },

    async tapOnChangeEmailButton() {
      await actions.tap(this.changeEmailButton);
    },

    async tapOnDeleteEmailButton() {
      await actions.tap(this.deleteEmailButton);
    },
  },

  addEmailAddressScreen: {
    emailInput: element(by.id('add-email-input')),
    emailValidationError: element(by.id('add-email-input-validation-error')),

    submitButton: element(by.id('submit-add-email-button')),

    async typeEmail(email: string) {
      await actions.typeText(this.emailInput, email);
    },

    async submit() {
      await actions.tap(this.submitButton);
    },
  },

  confirmEmailAddressScreen: {
    pincode: element(by.id('confirm-code-input')),
    pincodeValidationError: element(by.id('confirm-code-input-validation-error')),

    submitButton: element(by.id('confirm-code-email-button')),
    resendButton: element(by.id('resend-code-email-button')),

    async typeCode(value: string) {
      await actions.typeText(this.pincode, value);
    },

    async submit() {
      await actions.tap(this.submitButton);
    },

    async tapOnResendButton() {
      await actions.tap(this.resendButton);
    },
  },

  changeEmailScreen: {
    currentEmailText: element(by.id('current-email-text')),

    emailAddressInput: element(by.id('change-email-input')),
    submitButton: element(by.id('change-email-confirm-button')),

    async typeEmail(email: string) {
      await actions.typeText(this.emailAddressInput, email);
    },

    async submit() {
      await actions.tap(this.submitButton);
    },
  },

  verifyActionScreen: {
    pincodeInput: element(by.id('verify-action-code-input')),

    submitButton: element(by.id('submit-verify-action-code-button')),
    resendButton: element(by.id('resend-verify-action-code-button')),

    async typeCode(value: string) {
      await actions.typeText(this.pincodeInput, value);
    },

    async submit() {
      await actions.tap(this.submitButton);
    },

    async tapOnResendButton() {
      await actions.tap(this.resendButton);
    },
  },

  getNotificationsScreen: {
    emailAddressText: element(by.id('email-address-text')),

    allWalletsCheckbox: element(by.id('subscribe-all-wallets-checkbox')),

    confirmButton: element(by.id('confirm-action-button')),
    skipButton: element(by.id('skip-button')),

    async selectAllWallets() {
      await actions.tap(this.allWalletsCheckbox);
    },

    async selectWallet(walletName: string) {
      const walletCheckboxElement = element(by.id(`subscribe-${walletName}-wallet-checkbox`));

      await actions.tap(walletCheckboxElement);
    },

    async tapOnConfirmButton() {
      await actions.tap(this.confirmButton);
    },

    async tapOnSkipButton() {
      await actions.tap(this.skipButton);
    },
  },

  successScreen: MessageScreen('success'),

  deleteScreen: DeleteScreen(),
});

export default EmailNotifications;
