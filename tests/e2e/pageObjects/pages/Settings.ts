import { by, element } from 'detox';

import actions from '../../actions';

const Settings = () => ({
  advancedOptions: element(by.id('advanced-options')),
  advancedOptionsSwitch: element(by.id('advanced-options-switch')),

  async tapOnAdvancedOptions() {
    await actions.tap(this.advancedOptions);
  },

  async tapOnAdvancedOptionsSwitch() {
    await actions.tap(this.advancedOptionsSwitch);
  },
});

export default Settings;
