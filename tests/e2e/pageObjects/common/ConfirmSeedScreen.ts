import { by, element } from 'detox';

import actions from '../../actions';

const ConfirmSeedScreen = () => ({
  confirmButton: element(by.id('creates-wallet-button')),

  async confirmSeed(seed: string[]) {
    await Promise.all(seed.map(this.tapSeedWord));
    await this.tapConfirmButton();
  },

  async tapSeedWord(word: string) {
    await actions.tap(element(by.text(word)));
  },

  async tapConfirmButton() {
    await actions.tap(this.confirmButton.atIndex(1));
  },
});

export default ConfirmSeedScreen;
