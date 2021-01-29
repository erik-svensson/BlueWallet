import { by, element } from 'detox';

import actions from '../../actions';
import { SECOND } from '../../helpers';

export type MessageScreenType = 'success' | 'errorState' | 'processingState';

const MessageScreen = (type: MessageScreenType) => ({
  icon: element(by.id(`${type}-message`)),
  closeButton: element(by.id('message-close-button')),

  async close(): Promise<void> {
    await actions.tap(this.closeButton);
  },

  async waitUntilEnded(): Promise<void> {
    await waitFor(this.icon)
      .toBeNotVisible()
      .withTimeout(45 * SECOND);
  },
});

export default MessageScreen;
