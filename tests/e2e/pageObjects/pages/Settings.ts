import { by, element } from 'detox';

import actions from '../../actions';

type Language =
  | 'English'
  | 'Chinese'
  | 'Spanish'
  | 'Indonesian'
  | 'Japanese'
  | 'Korean'
  | 'Portuguese'
  | 'Vietnamese'
  | 'Turkish';

const languagesKeys: { [key in Language]: string } = {
  English: 'en',
  Chinese: 'zh',
  Spanish: 'es',
  Indonesian: 'id',
  Japanese: 'ja',
  Korean: 'ko',
  Portuguese: 'pt',
  Vietnamese: 'vi',
  Turkish: 'tr',
};

const Settings = () => ({
  advancedOptions: element(by.id('advanced-options-settings-item')),
  language: element(by.id('language-settings-item')),
  changePin: element(by.id('change-pin-settings-item')),
  biometry: element(by.id('biometry-settings-item')),
  aboutUs: element(by.id('about-us-settings-item')),

  advancedOptionsSwitch: element(by.id('advanced-options-switch')),
  biometrySwitch: element(by.id('biometry-switch')),

  async tapOnLanguageSettingsItem() {
    await actions.tap(this.language);
  },

  async chooseLanguage(language: Language) {
    const languageElement = element(by.id(`language-item-${languagesKeys[language]}`));

    await actions.tap(languageElement);
  },

  async confirmLanguageChange() {
    await actions.tap(element(by.text('Continue')));
  },

  async tapOnAdvancedOptionsSettingItem() {
    await actions.tap(this.advancedOptions);
  },

  async tapOnAdvancedOptionsSwitch() {
    await actions.tap(this.advancedOptionsSwitch);
  },

  async tapOnChangePinSettingsItem() {
    await actions.tap(this.changePin);
  },

  async tapOnBiometrySwitch() {
    await actions.tap(this.biometry);
  },

  async tapOnAboutUsSettingsItem() {
    await actions.tap(this.aboutUs);
  },
});

export default Settings;
