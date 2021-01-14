import { by, element } from 'detox';

import actions from '../../../actions';

const SettingsScreen = () => ({
  goldWalletIcon: element(by.id('goldwallet-logo')),

  settingsItems: {
    advancedOptions: element(by.id('advanced-options-settings-item')),
    language: element(by.id('language-settings-item')),
    changePin: element(by.id('change-pin-settings-item')),
    aboutUs: element(by.id('about-us-settings-item')),
  },

  biometrySwitch: element(by.id('biometry-settings-item')),

  async tapOnLanguage() {
    await actions.tap(this.settingsItems.language);
  },

  async tapOnAdvancedOptions() {
    await actions.tap(this.settingsItems.advancedOptions);
  },

  async tapOnChangePin() {
    await actions.tap(this.settingsItems.changePin);
  },

  async tapOnBiometrySwitch() {
    await actions.tap(this.biometrySwitch);
  },

  async tapOnAboutUs() {
    await actions.tap(this.settingsItems.aboutUs);
  },
});

export default SettingsScreen;
