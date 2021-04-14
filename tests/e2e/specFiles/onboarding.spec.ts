import { expect as jestExpect } from '@jest/globals';
import { expect, waitFor } from 'detox';

import gmailClient from '../gmail';
import { DEFAULT_EMAIL_ADDRESS } from '../helpers/consts';
import { isBeta, randomizeEmailAddress } from '../helpers/utils';
import app from '../pageObjects';

describe('Onboarding', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());

    await app.developerRoom.tapOnSkipTermsConditionsButton();
  });

  describe('@android @ios @smoke', () => {
    it('should be possible to pass onboarding and skip adding email address', async () => {
      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('1111');

      await app.onboarding.createPasswordScreen.typePassword('qwertyui');
      await app.onboarding.createPasswordScreen.submit();

      await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
      await app.onboarding.confirmPasswordScreen.submit();

      await app.onboarding.addEmailNotificationScreen.skip();

      await waitFor(app.onboarding.successScreen.icon)
        .toBeVisible()
        .withTimeout(20000);
    });
  });

  it('should be possible to pass onboarding and add an email address', async () => {
    const emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

    await app.onboarding.createPinScreen.typePin('1111');
    await app.onboarding.confirmPinScreen.typePin('1111');

    await app.onboarding.createPasswordScreen.typePassword('qwertyui');
    await app.onboarding.createPasswordScreen.submit();

    await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
    await app.onboarding.confirmPasswordScreen.submit();

    await app.onboarding.addEmailNotificationScreen.typeEmailAddress(emailAddress);
    await app.onboarding.addEmailNotificationScreen.submit();

    const code = await gmailClient.getEmailVerificationCode({ receiver: emailAddress });

    await app.onboarding.confirmEmailAddressScreen.typeCode(code);
    await app.onboarding.confirmEmailAddressScreen.submit();

    await waitFor(app.onboarding.successScreen.icon)
      .toBeVisible()
      .withTimeout(20000);
  });

  it('should be possible to resend the code while adding an email address', async () => {
    const emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

    await app.onboarding.createPinScreen.typePin('1111');
    await app.onboarding.confirmPinScreen.typePin('1111');

    await app.onboarding.createPasswordScreen.typePassword('qwertyui');
    await app.onboarding.createPasswordScreen.submit();

    await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
    await app.onboarding.confirmPasswordScreen.submit();

    await app.onboarding.addEmailNotificationScreen.typeEmailAddress(emailAddress);
    await app.onboarding.addEmailNotificationScreen.submit();

    await gmailClient.getEmailVerificationCode({ receiver: emailAddress });

    await app.onboarding.confirmEmailAddressScreen.tapOnResendButton();

    const code = await gmailClient.getEmailVerificationCode({ receiver: emailAddress });

    // TODO: Probably this test should be improved because now you can't be sure that the code is taken from the email
    // that has been sent after resend. One way would be marking as read an email after read but it doesn't seem
    // to be a completely bulletproof solution
    jestExpect(code).toBeDefined();
  });

  describe('@android @ios @regression', () => {
    it("should see an error message if typed PIN on confirmation page doesn't match", async () => {
      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('2222');

      await expect(app.onboarding.confirmPinScreen.pinValidationError).toBeVisible();
    });

    it("should see an error message if typed transaction password on confirmation page doesn't match", async () => {
      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('1111');

      await app.onboarding.createPasswordScreen.typePassword('qwertyui');
      await app.onboarding.createPasswordScreen.submit();

      await app.onboarding.confirmPasswordScreen.typePassword('asdfghjk\n');
      await app.onboarding.confirmPasswordScreen.submit();

      await expect(app.onboarding.confirmPasswordScreen.passwordValidationError).toBeVisible();
    });

    it('should be displayed an error message if typed email address is invalid', async () => {
      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('1111');

      await app.onboarding.createPasswordScreen.typePassword('qwertyui');
      await app.onboarding.createPasswordScreen.submit();

      await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
      await app.onboarding.confirmPasswordScreen.submit();

      await app.onboarding.addEmailNotificationScreen.typeEmailAddress('cloudbest.qagmail.com');
      await app.onboarding.addEmailNotificationScreen.submit();

      await expect(app.onboarding.addEmailNotificationScreen.emailValidationError).toBeVisible();
    });

    it('should be displayed an error message if typed code is invalid', async () => {
      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('1111');

      await app.onboarding.createPasswordScreen.typePassword('qwertyui');
      await app.onboarding.createPasswordScreen.submit();

      await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
      await app.onboarding.confirmPasswordScreen.submit();

      await app.onboarding.addEmailNotificationScreen.typeEmailAddress(randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS));
      await app.onboarding.addEmailNotificationScreen.submit();

      await app.onboarding.confirmEmailAddressScreen.typeCode('1111');
      await app.onboarding.confirmEmailAddressScreen.submit();

      await expect(app.onboarding.confirmEmailAddressScreen.pincodeValidationError).toBeVisible();
    });

    it('should be displayed an error message and send a code if exceeded a limit of attempts of sending codes', async () => {
      const emailAddress = randomizeEmailAddress(DEFAULT_EMAIL_ADDRESS);

      await app.onboarding.createPinScreen.typePin('1111');
      await app.onboarding.confirmPinScreen.typePin('1111');

      await app.onboarding.createPasswordScreen.typePassword('qwertyui');
      await app.onboarding.createPasswordScreen.submit();

      await app.onboarding.confirmPasswordScreen.typePassword('qwertyui');
      await app.onboarding.confirmPasswordScreen.submit();

      await app.onboarding.addEmailNotificationScreen.typeEmailAddress(emailAddress);
      await app.onboarding.addEmailNotificationScreen.submit();

      await gmailClient.getEmailVerificationCode({ receiver: emailAddress });

      await app.onboarding.confirmEmailAddressScreen.typeCode('1111');
      await app.onboarding.confirmEmailAddressScreen.submit();
      await app.onboarding.confirmEmailAddressScreen.typeCode('2222');
      await app.onboarding.confirmEmailAddressScreen.submit();
      await app.onboarding.confirmEmailAddressScreen.typeCode('3333');
      await app.onboarding.confirmEmailAddressScreen.submit();

      const code = await gmailClient.getEmailVerificationCode({ receiver: emailAddress });

      await expect(app.onboarding.confirmEmailAddressScreen.pincodeValidationError).toBeVisible();
      // TODO: Probably this test should be improved because now you can't be sure that the code is taken from the email
      // that has been sent after the last attempt. One way would be marking as read an email after read but it doesn't seem
      // to be a completely bulletproof solution. As Olek suggested, it'd be better to add a label "Used".
      jestExpect(code).toBeDefined();
    });
  });
});
