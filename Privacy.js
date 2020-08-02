import { Platform } from 'react-native';
import Obscure from 'react-native-obscure';

import { CONST } from 'app/consts';

const PrivacySnapshot = require('react-native-privacy-snapshot');

export default class Privacy {
  static enableBlur() {
    Platform.OS === CONST.android ? Obscure.activateObscure() : PrivacySnapshot.enabled(true);
  }

  static disableBlur() {
    Platform.OS === CONST.android ? Obscure.deactivateObscure() : PrivacySnapshot.enabled(false);
  }
}
