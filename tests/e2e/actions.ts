import Detox, { by, device, element, waitFor } from 'detox';

import { wait } from '../../utils/time';
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
      await closeKeyboard();
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

  const closeKeyboard = async () => {
    if (device.getPlatform() === 'android') {
      await device.pressBack();
    }

    if (device.getPlatform() === 'ios') {
      try {
        await element(by.label('return')).tapReturnKey();
      } catch (error) {
        // TODO: Do it better. Briefly speaking, depending on machine the tests are run on a simulator
        // with or without displayed Software Keyboard. To make it working well it's required programmatically
        // turn on the keyboard to make sure it's working the same on all configurations.
        return;
      }
    }
  };

  return { waitForElement, typeText, tap, multiTap, scrollToElement };
};

export default Actions();
