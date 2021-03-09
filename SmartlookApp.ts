import Smartlook from 'smartlook-react-native-wrapper';

import config from './src/config';

class SmartlookApp {
  constructor() {}

  init() {
    Smartlook.setupAndStartRecording(config.smartlookKey);
  }
  eventRegister = (eventName: string, event: {}) => {
    Smartlook.trackCustomEvent(`${eventName}`, { prop: event });
  };
}

export default SmartlookApp;
