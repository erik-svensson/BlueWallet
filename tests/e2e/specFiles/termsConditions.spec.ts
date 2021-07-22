import { expect as jestExpect } from '@jest/globals';
import { expect } from 'detox';

import { expectToBeDisabled } from '../assertions';
import { isBeta } from '../helpers/utils';
import app from '../pageObjects';

describe('Terms & Conditions', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnDoNothingButton();
    await app.termsConditionsScreen.waitUntilDisplayed();
  });

  describe('@android @ios @smoke', () => {
    it('should be possible to accept Terms & Conditions and proceed', async () => {
      await app.termsConditionsScreen.scrollDown();
      await app.termsConditionsScreen.tapOnAgreementCheckboxes();
      await app.termsConditionsScreen.tapOnAgreeButton();
    });
  });

  describe('@android @ios @regression', () => {
    it("shouldn't be possible to accept Terms & Conditions without checked agreements", async () => {
      await expectToBeDisabled(app.termsConditionsScreen.agreeButton, () =>
        expect(app.termsConditionsScreen.header).toBeVisible(),
      );
    });

    it('should close the app once clicked confirm button on "Are you sure?" pop-up', async () => {
      await app.termsConditionsScreen.tapOnDisagreeButton();
      await jestExpect(() => app.termsConditionsScreen.tapYesOnModal()).rejects.toThrow();
    });

    it('should close the pop-up once clicked decline button on "Are you sure?" pop-up', async () => {
      await app.termsConditionsScreen.tapOnDisagreeButton();
      await app.termsConditionsScreen.tapNoOnModal();
      expect(app.termsConditionsScreen.header).toBeVisible();
    });
  });
});
