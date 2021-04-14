import { by, element } from 'detox';

import actions from '../../../actions';
import MessageScreen from '../../common/MessageScreen';
import TransactionConfirmationScreen from '../../common/TransactionConfirmationScreen';
import TransactionPasswordScreen from '../../common/TransactionPasswordScreen';

const CancelTransaction = () => {
  const TransactionListScreen = () => ({
    nextButton: element(by.id('cancel-transaction-next-button')),

    async chooseTransactionFromTheList(note: string) {
      await actions.tap(element(by.id(`transaction-item-${note}-checkbox`)));
    },

    async tapNextButton() {
      await actions.tap(this.nextButton);
    },
  });

  const TransactionDetailsScreen = () => ({
    walletAddressInput: element(by.id('cancel-transaction-wallet-address-input')),
    useWalletAddressButton: element(by.id('use-address-of-this-wallet-item')),
    nextButton: element(by.id('cancel-transaction-wallet-details-next-button')),

    async typeWalletAddress(address: string) {
      await actions.typeText(this.walletAddressInput, address);
    },

    async tapUseWalletAddressButton() {
      await actions.tap(this.useWalletAddressButton);
    },

    async tapNextButton() {
      await actions.tap(this.nextButton);
    },
  });

  const SeedPhraseScreen = () => ({
    self: 'cancel-seed-phrase-screen',
    cancelButton: element(by.id('seed-phrase-cancel-button')),

    async typePrivateCancelKeySeedPhrase(seedPhrases: string) {
      await this.typeSeedPhraseFrom(seedPhrases.split(' '));
    },

    async typePrivateFastKeySeedPhrase(seedPhrases: string) {
      await this.typeSeedPhraseFrom(seedPhrases.split(' '));
    },

    async tapCancelButton() {
      await actions.tap(this.cancelButton);
    },

    /** Private function */
    async typeSeedPhraseFrom(list: string[]) {
      /** Seed Phrase list index starts from 0 but index for id starts from 1 */
      for (let index = 0; index < list.length; index++) {
        const seedPhraseInput = element(by.id(`cancel-seed-phrase-${index + 1}-input`));

        await actions.scrollToElement(seedPhraseInput, this.self);
        await actions.typeText(seedPhraseInput, list[index]);
      }
    },
  });

  return {
    transactionListScreen: TransactionListScreen(),
    transactionDetailsScreen: TransactionDetailsScreen(),
    seedPhraseScreen: SeedPhraseScreen(),
    transactionConfirmationScreen: TransactionConfirmationScreen(),
    transactionPasswordScreen: TransactionPasswordScreen(),
    successScreen: MessageScreen('success'),
  };
};

export default CancelTransaction;
