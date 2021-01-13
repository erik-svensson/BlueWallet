import { by, element } from 'detox';

import actions from '../../../actions';

const ChangePin = () => {
  const CurrentPinScreen = () => ({
    pinInput: element(by.id('current-pin-input')),
    pinValidationError: element(by.id('create-pin-validation-error')),

    async typePin() {
      await actions.tap(this.pinInput);
    },
  });

  const NewPinScreen = () => ({
    pinInput: element(by.id('create-pin-input')),
    pinValidationError: element(by.id('create-pin-validation-error')),

    async typePin() {
      await actions.tap(this.pinInput);
    },
  });

  const ConfirmPinScreen = () => ({
    pinInput: element(by.id('confirm-pin-input')),
    pinValidationError: element(by.id('confirm-pin-validation-error')),

    async typePin() {
      await actions.tap(this.pinInput);
    },
  });

  return {
    currentPinScreen: CurrentPinScreen(),
    newPinScreen: NewPinScreen(),
    confirmPinScreen: ConfirmPinScreen(),
  };
};

export default ChangePin;
