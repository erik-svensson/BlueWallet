import { by, element } from 'detox';

import actions from '../../actions';

const Dashboard = () => {
  const DashboardScreen = () => ({
    header: element(by.id('dashboard-header')),
    self: element(by.id('dashboard-screen')),

    noWalletsIcon: element(by.id('no-wallets-icon')),
    filterTransactionsButton: element(by.id('filter-transactions-button')),
    addButton: element(by.id('add-wallet-button')),
    sendButton: element(by.id('send-coins-button')),
    recieveButton: element(by.id('receive-coins-button')),

    getWalletDetailsButtonElement: (walletName: string) => element(by.id(`show-${walletName}-details-button`)),

    getTransactionElement: (note: string) => element(by.id(`transaction-item-${note}`)),

    async tapOnAddButton() {
      await actions.tap(this.addButton);
    },

    async tapOnFilterButton() {
      await actions.tap(this.filterTransactionsButton);
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

    async scrollToTheTransactionWithNote(note: string) {
      await actions.scrollToElement(element(by.id(`transaction-item-${note}`)), 'dashboard-screen');
    },
  });

  return { dashboardScreen: DashboardScreen() };
};

export default Dashboard;
