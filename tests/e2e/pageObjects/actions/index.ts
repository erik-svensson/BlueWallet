import Detox, { waitFor } from 'detox';

import { WAIT_FOR_ELEMENT_TIMEOUT } from '../../helpers';

interface TypeTextOptions {
  replace?: boolean;
  closeKeyboard?: boolean;
}

const Actions = () => ({
  typeText: async (element: Detox.DetoxAny, text: string, options?: TypeTextOptions) => {
    await waitFor(element)
      .toBeVisible()
      .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);

    if (options?.replace) {
      await element.clearText();
    }

    await element.typeText(text);

    if (options?.closeKeyboard) {
      await element.typeText('\n');
    }
  },

  tap: async (element: Detox.DetoxAny) => {
    await waitFor(element)
      .toBeVisible()
      .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);

    await element.tap();
  },
});

export default Actions();
