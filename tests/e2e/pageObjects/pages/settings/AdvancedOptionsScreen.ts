import { by, element } from 'detox';

import actions from '../../../actions';

const AdvancedOptionsScreen = () => ({
  advancedOptionsSwitch: element(by.id('advanced-options-switch')),

  async tapOnAdvancedOptionsSwitch() {
    await actions.tap(this.advancedOptionsSwitch);
  },
});

export default AdvancedOptionsScreen;
