import Detox, { expect } from 'detox';

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
