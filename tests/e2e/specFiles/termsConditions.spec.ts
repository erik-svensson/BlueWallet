import { expectToBeDisabled } from '../assertions';
import { isBeta } from '../helpers/utils';
import app from '../pageObjects';

describe('Terms & Conditions', () => {
  describe('@android @ios @smoke', () => {
    it('should be possible to accept Terms & Conditions and proceed', async () => {
      isBeta() && (await app.onboarding.betaVersionScreen.close());

      await app.developerRoom.tapOnDoNothingButton();

      await app.termsConditionsScreen.waitUntilDisplayed();
      await app.termsConditionsScreen.scrollDown();
      await app.termsConditionsScreen.tapOnAgreementCheckboxes();
      await app.termsConditionsScreen.tapOnAgreeButton();
    });
  });

  describe('@android @ios @regression', () => {
    it("shouldn't be possible to accept Terms & Conditions without checked agreements", async () => {
      await expectToBeDisabled(app.termsConditionsScreen.agreeButton);
    });

    xit('should close the app once clicked confirm button on "Are you sure?" pop-up', async () => {});

    xit('should close the pop-up once clicked decline button on "Are you sure?" pop-up', async () => {});
  });
});
