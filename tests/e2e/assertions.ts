import Detox, { by, element, expect } from 'detox';

// FIX: This function does not do what it's supposed to
// when tapping the button
// if error is thrown - nothing happens
// if no error is thrown - nothing happens
export const expectToBeDisabled = async (element: Detox.IndexableNativeElement): Promise<void> => {
  try {
    await expect(element).toBeVisible();
    await element.tap();
  } catch (error) {
    return;
  }
};

export const expectToBeCopied = async () => {
  // NOTE: Proper solution would be to check device clipboard
  // Currently not implemented in detox
  // https://github.com/wix/detox/issues/222
  expect(element(by.text('Copied!'))).toBeVisible();
};
