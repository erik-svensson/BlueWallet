import { by, device, element } from 'detox';

import actions from '../../../actions';

export type SupportedLanguage =
  | 'English'
  | 'Chinese'
  | 'Spanish'
  | 'Indonesian'
  | 'Japanese'
  | 'Korean'
  | 'Portuguese'
  | 'Vietnamese'
  | 'Turkish';

const languagesKeys: { [key in SupportedLanguage]: string } = {
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

const LanguageScreen = () => ({
  async chooseLanguage(language: SupportedLanguage) {
    const langElement = element(by.id(`language-item-${languagesKeys[language]}`));

    await actions.tap(langElement);
  },

  async confirmLanguageChange() {
    if (device.getPlatform() === 'android') {
      await element(by.text('CONFIRM')).tap();
    } else {
      await element(by.label('Confirm'))
        .atIndex(0)
        .tap();
    }
  },
});

export default LanguageScreen;
