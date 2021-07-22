import Detox, { by, element, expect } from 'detox';

// There is no easy way to check if a button is disabled
// In theory tap method should throw an error if tapping a disabled element, however that's not always the case
// This workaround accepts a function that should throw an error when an enabled button was tapped
// If no error is thrown, it means tapping the button had no effect - therefore it's disabled
export const expectToBeDisabled = async (
  element: Detox.IndexableNativeElement,
  predicate: () => Promise<any>,
): Promise<void> => {
  await expect(element).toBeVisible();
  try {
    await element.tap();
  } catch (error) {
    return;
  }

  try {
    await predicate();
  } catch (error) {
    throw new Error('Element was not disabled - predicate function has thrown an error');
  }
};

export const expectToBeCopied = async () => {
  // NOTE: Proper solution would be to check device clipboard
  // Currently not implemented in detox
  // https://github.com/wix/detox/issues/222
  expect(element(by.text('Copied!'))).toBeVisible();
};
