import { by, element } from 'detox';

import actions from '../../actions';
import { WAIT_FOR_ELEMENT_TIMEOUT } from '../../helpers/consts';

const Dashboard = () => {
  const DashboardScreen = () => ({
    self: 'dashboard-screen',

    header: element(by.id('dashboard-header')),
    addButton: element(by.id('add-wallet-button')),
    createWalletButton: element(by.id('create-wallet-button')),
    //TODO: IF No wallets select create-wallet-button, else use add-wallet-button
    filterButton: element(by.id('filter-transactions-button')),

    walletsCarousel: element(by.id('wallets-carousel')),
    walletsDropdown: element(by.id('dashboard-wallets-dropdown')),
    getWalletDropdownItem: (walletName: string) => element(by.id(`wallet-dropdown-${walletName}-item`)),
    getWalletCardElement: (walletName: string) => element(by.id(`wallet-${walletName}-card`)),
    getWalletDetailsButtonElement: (walletName: string) => element(by.id(`show-${walletName}-details-button`)),

    noWalletsIcon: element(by.id('no-wallets-icon')),

    recieveButton: element(by.id('receive-coins-button')),
    cancelButton: element(by.id('recover-coins-button')),
    sendButton: element(by.id('send-coins-button')),

    noTransactionsIcon: element(by.id('no-transactions-icon')),
    clearAllFiltersButton: element(by.id('clear-all-filters-button')),

    getTransactionElement: (id: string) => element(by.id(`transaction-item-${id}`)),

    async tapOnCreateWalletButton() {
      await actions.tap(this.createWalletButton);
    },
    async tapOnAddButton() {
      await actions.tap(this.addButton);
    },

    async tapOnFilterButton() {
      await actions.tap(this.filterButton);
    },

    async switchWalletWithCarousel(direction: 'left' | 'right') {
      await actions.swipeCarousel(this.walletsCarousel, direction);
    },

    async switchWalletWithDropdown(walletName: string) {
      await actions.tap(this.walletsDropdown);
      await actions.tap(this.getWalletDropdownItem(walletName));
    },

    async tapOnWallet(name: string) {
      const wallet = element(by.id(`wallet-${name}`));

      await actions.tap(wallet);
    },

    async tapOnWalletDetailsButton(name: string) {
      const element = this.getWalletDetailsButtonElement(name);

      await actions.tap(element);
    },

    async tapOnSendButton() {
      await actions.tap(this.sendButton);
    },

    async tapOnReceiveButton() {
      await actions.tap(this.recieveButton);
    },

    async tapOnCancelButton() {
      await actions.tap(this.cancelButton);
    },

    async tapOnClearAllFiltersButton() {
      await actions.tap(this.clearAllFiltersButton);
    },

    async tapOnTransaction(transaction: string) {
      await actions.tap(this.getTransactionElement(transaction));
    },

    async scrollTo(element: Detox.DetoxAny) {
      await actions.scrollToElement(element, this.self);
    },

    /** Scrolls to the transaction of testID based on a transaction id or a note */
    async scrollToTransactionWith(id?: string) {
      await actions.scrollToElement(element(by.id(`transaction-item-${id}`)), this.self);
    },

    async refreshDashboard() {
      await actions.refreshView(this.self);
    },

    async searchForTransactionWith(id?: string) {
      await actions.searchForElement(element(by.id(`transaction-item-${id}`)), this.self);
    },

    async waitForConfirmationForTransactionWith(note: string) {
      const confirmationNumber = 1;

      await actions.waitForElement(
        element(by.id(`transaction-item-${note}`).withDescendant(by.id(`transaction-${confirmationNumber}-text`))),
        WAIT_FOR_ELEMENT_TIMEOUT.TRANSACTION_CONFIRMATION,
      );
    },

    async scrollToCancelButton() {
      await actions.scrollToElement(this.cancelButton, this.self, { pixels: 200, direction: 'up' });
    },

    async scrollToWallet(walletName: string) {
      await actions.scrollToElement(this.getWalletCardElement(walletName), this.self, {
        pixels: 200,
        direction: 'down',
        startY: 0.5,
      });
    },
  });

  return { dashboardScreen: DashboardScreen() };
};

export default Dashboard;
