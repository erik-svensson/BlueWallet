import { by, element } from 'detox';

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
});

export default LanguageScreen;
