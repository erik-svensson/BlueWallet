import { by, element } from 'detox';

import actions from '../../actions';

const TransactionDetailsScreen = () => ({
  self: 'transction-details-screen',
  header: element(by.id('transaction-details-header')),

  fromCopyButton: element(by.id('from-address-copy-button')),
  toCopyButton: element(by.id('to-address-copy-button')),
  txidCopyButton: element(by.id('txid-copy-button')),
  viewInBlockExplorerButton: element(by.id('view-in-block-explorer-button')),

  async tapOnFromCopyButton() {
    await actions.scrollToElement(this.fromCopyButton, this.self);
    await actions.tap(this.fromCopyButton);
  },

  async tapOnToCopyButton() {
    await actions.scrollToElement(this.toCopyButton, this.self);
    await actions.tap(this.toCopyButton);
  },

  async tapOnTxidCopyButton() {
    await actions.scrollToElement(this.txidCopyButton, this.self);
    await actions.tap(this.txidCopyButton);
  },

  async tapOnViewInBlockExplorerButton() {
    await actions.scrollToElement(this.viewInBlockExplorerButton, this.self);
    await actions.tap(this.viewInBlockExplorerButton);
  },
});

export default TransactionDetailsScreen;
