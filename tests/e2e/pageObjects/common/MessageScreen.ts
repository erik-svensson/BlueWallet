import { by, element } from 'detox';

import actions from '../../actions';
import { SECOND } from '../../helpers';

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
      .withTimeout(120 * SECOND);
  },
});

export default MessageScreen;
