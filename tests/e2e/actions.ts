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

  const scrollToElement = async (target: Detox.DetoxAny, scrollable: string, options?: ScrollToElementOptions) => {
    const { pixels, direction } = options || { pixels: 100, direction: 'down' };

    await waitFor(target)
      .toBeVisible()
      .whileElement(by.id(scrollable))
      .scroll(pixels, direction);
  };

  const swipeCarousel = async (carousel: Detox.DetoxAny, direction: 'left' | 'right') => {
    await waitFor(carousel)
      .toBeVisible()
      .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT);

    await carousel.swipe(direction, 'fast', 0.75, 0.5);
  };

  /** Scrolls down and up to find an element */
  const searchForElement = async (target: Detox.DetoxAny, scrollable: string) => {
    const pixels = 100;

    try {
      await waitFor(target)
        .toBeVisible()
        .whileElement(by.id(scrollable))
        .scroll(pixels, 'down');

      return;
    } catch (error) {}

    try {
      await waitFor(target)
        .toBeVisible()
        .whileElement(by.id(scrollable))
        .scroll(pixels, 'up');

      return;
    } catch (error) {
      throw error;
    }
  };

  return { waitForElement, typeText, tap, multiTap, scrollToElement, swipeCarousel, searchForElement };
};

export default Actions();
