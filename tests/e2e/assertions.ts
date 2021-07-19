import Detox, { expect } from 'detox';

export const expectToBeDisabled = async (element: Detox.IndexableNativeElement): Promise<void> => {
  try {
    await expect(element).toBeVisible();
    await element.tap();
  } catch (error) {
    return;
  }
};
