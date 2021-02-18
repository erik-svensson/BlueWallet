import { by, element } from 'detox';

import actions from '../../actions';
import MessageScreen from '../common/MessageScreen';

const Onboarding = () => {
  const BetaVersionScreen = () => ({
    closeButton: element(by.id('close-beta-version-screen')),

    async close(): Promise<void> {
      await actions.tap(this.closeButton);
    },
  });

  const CreatePinScreen = () => ({
    pinInput: element(by.id('create-pin-input')),

    async typePin(value: string): Promise<void> {
      await actions.typeText(this.pinInput, value);
    },
  });

  const ConfirmPinScreen = () => ({
    pinInput: element(by.id('confirm-pin-input')),
    pinValidationError: element(by.id('confirm-pin-input-validation-error')),

    async typePin(value: string): Promise<void> {
      await actions.typeText(this.pinInput, value);
    },
  });

  const CreatePasswordScreen = () => ({
    passowrdInput: element(by.id('create-transaction-password')),
    submitButton: element(by.id('submit-create-transaction-password')),

    async typePassword(value: string): Promise<void> {
      await actions.typeText(this.passowrdInput, value);
    },

    async submit(): Promise<void> {
      await actions.tap(this.submitButton);
    },
  });

  const ConfirmPasswordScreen = () => ({
    passowrdInput: element(by.id('confirm-transaction-password')),
    passwordValidationError: element(by.id('confirm-transaction-password-validation-error')),
    submitButton: element(by.id('submit-transaction-password-confirmation')),

    async typePassword(value: string): Promise<void> {
      await actions.typeText(this.passowrdInput, value);
    },

    async submit(): Promise<void> {
      await actions.tap(this.submitButton);
    },
  });

  const AddEmailNotificationScreen = () => ({
    skipEmailNotificationButton: element(by.id('skip-notification-email')),

    async skipEmailNotification(): Promise<void> {
      await actions.tap(this.skipEmailNotificationButton);
    },
  });

  return {
    betaVersionScreen: BetaVersionScreen(),
    createPinScreen: CreatePinScreen(),
    confirmPinScreen: ConfirmPinScreen(),
    createPasswordScreen: CreatePasswordScreen(),
    confirmPasswordScreen: ConfirmPasswordScreen(),
    successScreen: MessageScreen('success'),
    addEmailNotificationScreen: AddEmailNotificationScreen(),
  };
};

export default Onboarding;
