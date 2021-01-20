import Detox, { by, device, waitFor } from 'detox';

import { WAIT_FOR_ELEMENT_TIMEOUT } from './helpers';

interface TypeTextOptions {
  replace?: boolean;
  closeKeyboard?: boolean;
}

interface ScrollToElementOptions {
  pixels: number;
  direction: Detox.Direction;
}

const Actions = () => {
  const waitForElement = async (target: Detox.DetoxAny) => {
    await waitFor(target)
      .toBeVisible()
      .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);
  };

  const typeText = async (target: Detox.DetoxAny, text: string, options?: TypeTextOptions) => {
    await waitForElement(target);

    if (options?.replace) {
      await target.clearText();
    }

    await target.typeText(text);

    if (options?.closeKeyboard) {
      if (device.getPlatform() === 'android') {
        await device.pressBack();
      }

      if (device.getPlatform() === 'ios') {
        await target.tapReturnKey();
      }
    }
  };

  const tap = async (target: Detox.DetoxAny) => {
    await waitForElement(target);
    await target.tap();
  };

  const multiTap = async (target: Detox.DetoxAny, times: number) => {
    await waitForElement(target);
    await target.multiTap(times);
  };

  const scrollToElement = async (
    target: Detox.DetoxAny,
    scrollableElement: string,
    options: ScrollToElementOptions = { pixels: 100, direction: 'down' },
  ) => {
    await waitFor(target)
      .toBeVisible()
      .whileElement(by.id(scrollableElement))
      .scroll(options.pixels, options.direction);
  };

  return { waitForElement, typeText, tap, multiTap, scrollToElement };
};

export default Actions();
