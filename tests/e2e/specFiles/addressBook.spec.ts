import { expect, waitFor } from 'detox';

import { WAIT_FOR_ELEMENT_TIMEOUT } from '../helpers/consts';
import { isBeta } from '../helpers/utils';
import app from '../pageObjects';
import { createNewContact } from '../steps';

describe('Address book', () => {
  beforeEach(async () => {
    isBeta() && (await app.onboarding.betaVersionScreen.close());
    await app.developerRoom.tapOnSkipOnboardingButton();
    await app.onboarding.addEmailNotificationScreen.skip();
    await app.navigationBar.changeTab('address book');
  });

  describe('Contacts', () => {
    describe('@android @ios @smoke', () => {
      it('should display empty list if there is no authenticators added', async () => {
        await expect(app.addressBook.contactsScreen.noContactsIcon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      it('should display "No results" if couldn\'t find a contact using Search feature', async () => {
        await createNewContact('Heisenberg', '2N6MAzhNc6LkMU6paWrPQpXLAs79rP7UnCi');

        await app.addressBook.contactsScreen.typeInSearchbar('Walter');
        await expect(app.addressBook.contactsScreen.noContactsFoundIcon).toBeVisible();
      });

      it('should be possible to find a contact using Search feature', async () => {
        await createNewContact('Heisenberg', '2N6MAzhNc6LkMU6paWrPQpXLAs79rP7UnCi');

        await app.addressBook.contactsScreen.typeInSearchbar('Heisenberg');
        await expect(app.addressBook.contactsScreen.getContactElement('Heisenberg')).toBeVisible();
      });

      it('should be possible to clear content of the searchbox by clicking on clear button', async () => {
        await createNewContact('Heisenberg', '2N6MAzhNc6LkMU6paWrPQpXLAs79rP7UnCi');

        await app.addressBook.contactsScreen.typeInSearchbar('Test');
        await app.addressBook.contactsScreen.clearSearchbar();
        await expect(app.addressBook.contactsScreen.getContactElement('Heisenberg')).toBeVisible();
      });
    });
  });

  describe('Adding contact', () => {
    describe('@android @ios @smoke', () => {
      it('should be possible to create a new contact by typing address manually', async () => {
        await app.addressBook.contactsScreen.tapOnCreateButton();
        await app.addressBook.newContact.addNewContactScreen.typeName(`Heisenberg`);
        await app.addressBook.newContact.addNewContactScreen.typeAddress('2NA5kx7ztNhCBVogN2kLtNPBMXA3fdkX2Cc');
        await app.addressBook.newContact.addNewContactScreen.submit();
        await expect(app.addressBook.newContact.successScreen.icon).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      xit('should be possible to create a new contact by scaning QR code', () => {});

      it("shouldn't be possible to create a new contact if name is invalid", async () => {
        await app.addressBook.contactsScreen.tapOnCreateButton();
        await app.addressBook.newContact.addNewContactScreen.typeName('Foo-name!');
        await app.addressBook.newContact.addNewContactScreen.submit();
        await waitFor(app.addressBook.newContact.addNewContactScreen.nameValidationError)
          .toBeVisible()
          .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT.DEFAULT);
      });

      it("shouldn't be possible to create a new contact if address is invalid", async () => {
        await app.addressBook.contactsScreen.tapOnCreateButton();
        await app.addressBook.newContact.addNewContactScreen.typeAddress('fOoBa5bAZ');
        await app.addressBook.newContact.addNewContactScreen.submit(); // TODO: Remove it once it's fixed in the app
        await waitFor(app.addressBook.newContact.addNewContactScreen.addressValidationError)
          .toBeVisible()
          .withTimeout(WAIT_FOR_ELEMENT_TIMEOUT.DEFAULT);
      });
    });
  });

  describe('Details', () => {
    const contactName = 'Heisenberg';

    beforeEach(async () => {
      await createNewContact(contactName, '2NA5kx7ztNhCBVogN2kLtNPBMXA3fdkX2Cc');
      await app.addressBook.contactsScreen.tapOnContact('Heisenberg');
    });

    describe('@android @ios @smoke', () => {
      it('should be possible to display details of a contact', async () => {
        await expect(app.addressBook.details.detailsScreen.nameInput).toBeVisible();
      });
    });

    describe('@android @ios @regression', () => {
      xit('should be possible to copy address of the contact', async () => {
        await app.addressBook.details.detailsScreen.tapOnCopyAddressButton();
        // TODO: Add assertion. Currently there is no way to check clipbaord content in Detox
      });

      it('should be possible to delete a contact', async () => {
        await app.addressBook.details.detailsScreen.tapOnDeleteButton();
        await app.addressBook.details.deleteScreen.confirm();
        await expect(app.addressBook.details.deleteSuccessScreen.icon).toBeVisible();
      });

      xit("should be possible to get access to Send coins screen from the contact's details", async () => {
        await app.addressBook.details.detailsScreen.tapOnDeleteButton();
        await app.addressBook.details.detailsScreen.tapOnSendCoinsButton();
        // TODO: Add assertion once Send coin screen is implemented
      });

      it('should be possible to display QR code of the contact', async () => {
        await app.addressBook.details.detailsScreen.tapOnShowQrCodeButton();
        await expect(app.addressBook.details.qrCodeScreen.qrCode).toBeVisible();
      });

      xit('should be possible to share QR code of the contact', async () => {
        await app.addressBook.details.detailsScreen.tapOnShowQrCodeButton();
        await app.addressBook.details.qrCodeScreen.tapOnShareButton();
        // TODO: Add assertion. I don't know how to assert whether share button worked or not.
      });
    });
  });
});
