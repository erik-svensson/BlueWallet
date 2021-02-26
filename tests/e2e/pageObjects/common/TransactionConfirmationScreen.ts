import { by, element } from 'detox';

import actions from '../../actions';

const TransactionConfirmationScreen = () => ({
  confirmButton: element(by.id('transaction-confirmation-button')),

  async tapConfirmButton() {
    await actions.tap(this.confirmButton);
  },
});

export default TransactionConfirmationScreen;
