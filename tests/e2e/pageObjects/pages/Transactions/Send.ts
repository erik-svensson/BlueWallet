import { by, element } from 'detox';

import actions from '../../../actions';
import MessageScreen from '../../common/MessageScreen';
import TransactionConfirmationScreen from '../../common/TransactionConfirmationScreen';
import TransactionPasswordScreen from '../../common/TransactionPasswordScreen';

type transactionTypeRadios = 'Secure' | 'Secure Fast';

const SendCoins = () => {
  const SendCoinsMainScreen = () => ({
    amountInput: element(by.id('send-coins-amount-input')),
    walletAdressInput: element(by.id('send-coins-wallet-address-input')),
    nextButton: element(by.id('send-coins-next-button')),
    noteInupt: element(by.id('send-coins-note-input')),

    transactionTypeRadios: {
      Secure: element(by.id('send-coins-secure-transaction-type-radio')),
      'Secure Fast': element(by.id('send-coins-secure-fast-transaction-type-radio')),
    },

    async typeCoinsAmountToSend(amount: string) {
      await actions.typeText(this.amountInput, amount, { closeKeyboard: true });
    },

    async typeWalletAddress(address: string) {
      await actions.typeText(this.walletAdressInput, address, { closeKeyboard: true });
    },

    async typeNote(note: string) {
      await actions.typeText(this.noteInupt, note, { closeKeyboard: true });
    },

    async chooseTransactionType(type: transactionTypeRadios) {
      await actions.tap(this.transactionTypeRadios[type]);
    },

    async tapNextButton() {
      await actions.tap(this.nextButton);
    },
  });

  return {
    sendCoinsMainScreen: SendCoinsMainScreen(),
    transactionConfirmationScreen: TransactionConfirmationScreen(),
    transactionPasswordScreen: TransactionPasswordScreen(),
    successScreen: MessageScreen('success'),
  };
};

export default SendCoins;
