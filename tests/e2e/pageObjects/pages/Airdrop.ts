import { element, by } from 'detox';

import actions from '../../actions';

const Airdrop = () => ({
  dashboard: {
    title: element(by.id('airdrop-title')),
    skipButton: element(by.id('cancel-button')),

    async skipIfActive() {
      if (await actions.isDisplayed(this.title)) {
        await actions.tap(this.skipButton);
      }
    },
  },

  walletCreation: {
    title: element(by.id('airdrop-register-title')),
    registerWalletNo: element(by.id('airdrop-register-no')),

    async skipWalletSubscription() {
      if (await actions.isDisplayed(this.title)) {
        await actions.tap(this.registerWalletNo);
      }
    },
  },
});

export default Airdrop;
