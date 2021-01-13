import { by, element } from 'detox';

import actions from '../../../actions';

const AboutUsScreen = () => ({
  goToOurGithubButton: element(by.id('go-to-github-button')),
  rateGoldWalletButton: element(by.id('rate-us-button')),

  async tapOnGoToGithubButton() {
    await actions.tap(this.goToOurGithubButton);
  },

  async tapOnRateGoldWalletButton() {
    await actions.tap(this.rateGoldWalletButton);
  },
});

export default AboutUsScreen;
