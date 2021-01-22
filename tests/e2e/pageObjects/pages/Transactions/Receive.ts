import { by, element } from 'detox';

import actions from '../../../actions';

const ReceiveCoinsScreen = () => ({
  shareWalletAddressButton: element(by.id('share-wallet-address-button')),
  qrCodeIcon: element(by.id('qr-code-icon')),
  walletAddressText: element(by.id('wallet-address-text')),
  receiveAmountText: element(by.id('receive-amount-text')),
  amountInput: element(by.id('receive-amount-input')),
  submitAmountButton: element(by.id('receive-submit-button')),

  async typeAmountToReceive(amount: string) {
    await actions.tap(this.receiveAmountText);
    await actions.typeText(this.amountInput, amount);
    await actions.tap(this.submitAmountButton);
  },
});

export default ReceiveCoinsScreen;
