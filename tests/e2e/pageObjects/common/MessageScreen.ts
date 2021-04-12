import { by, element, waitFor } from 'detox';

import actions from '../../actions';

export type MessageScreenType = 'success' | 'errorState' | 'processingState';

const MessageScreen = (type: MessageScreenType) => ({
  icon: element(by.id(`${type}-message`)),
  closeButton: element(by.id('message-close-button')),

  async close() {
    await actions.tap(this.closeButton);
  },

  async waitUntilEnded() {
    await waitFor(this.icon)
      .toBeNotVisible()
      .withTimeout(120 * 1000);
  },
});

export default MessageScreen;
