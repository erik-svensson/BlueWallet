import Detox, { waitFor, by } from 'detox';

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
  const waitForElement = async (element: Detox.DetoxAny) => {
    await waitFor(element)
      .toBeVisible()
      .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);
  };

  const typeText = async (element: Detox.DetoxAny, text: string, options?: TypeTextOptions) => {
    await waitForElement(element);

    if (options?.replace) {
      await element.clearText();
    }

    await element.typeText(text);

    if (options?.closeKeyboard) {
      await element.typeText('\n');
    }
  };

  const tap = async (element: Detox.DetoxAny) => {
    await waitForElement(element);
    await element.tap();
  };

  const multiTap = async (element: Detox.DetoxAny, times: number) => {
    await waitForElement(element);
    await element.multiTap(times);
  };

  const scrollToElement = async (
    element: Detox.DetoxAny,
    scrollableElement: string,
    options: ScrollToElementOptions = { pixels: 100, direction: 'down' },
  ) => {
    await waitFor(element)
      .toBeVisible()
      .whileElement(by.id(scrollableElement))
      .scroll(options.pixels, options.direction);
  };

  return { waitForElement, typeText, tap, multiTap, scrollToElement };
};

export default Actions();
