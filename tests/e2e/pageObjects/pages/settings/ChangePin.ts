import { by, element } from 'detox';

import actions from '../../../actions';
import MessageScreen from '../../common/MessageScreen';

const ChangePin = () => {
  const CurrentPinScreen = () => ({
    pinInput: element(by.id('current-pin-input')),
    pinValidationError: element(by.id('current-pin-input-validation-error')),

    async typePin(pin: string) {
      await actions.typeText(this.pinInput, pin);
    },
  });

  const ApplicationBlockedScreen = () => ({
    header: element(by.id('application-blocked-screen-header')),
  });

  const NewPinScreen = () => ({
    pinInput: element(by.id('create-pin-input')),
    pinValidationError: element(by.id('create-pin-input-validation-error')),

    async typePin(pin: string) {
      await actions.typeText(this.pinInput, pin);
    },
  });

  const ConfirmPinScreen = () => ({
    pinInput: element(by.id('confirm-pin-input')),
    pinValidationError: element(by.id('confirm-pin-input-validation-error')),

    async typePin(pin: string) {
      await actions.typeText(this.pinInput, pin);
    },
  });

  return {
    currentPinScreen: CurrentPinScreen(),
    applicationBlockedScreen: ApplicationBlockedScreen(),
    newPinScreen: NewPinScreen(),
    confirmPinScreen: ConfirmPinScreen(),
    successScreen: MessageScreen('success'),
  };
};

export default ChangePin;
