import { by, element } from 'detox';

import actions from '../../actions';

const ScanQrCodeScreen = () => ({
  customStringInput: element(by.id('custom-string-input')),
  submitButton: element(by.id('custom-string-submit-button')),

  async scanCustomString(data: string) {
    await actions.replaceText(this.customStringInput, data, { closeKeyboard: true });
    await actions.tap(this.submitButton);
  },
});

export default ScanQrCodeScreen;
