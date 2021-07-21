import { by, element, expect } from 'detox';

import actions from '../../actions';
import DeleteScreen from '../common/DeleteScreen';
import MessageScreen from '../common/MessageScreen';

const WalletDetails = () => {
  const mainScreen = () => ({
    walletName: element(by.id('wallet-name-text')),
    walletType: element(by.id('wallet-type-text')),

    exportWalletButton: element(by.id('export-wallet-button')),
    showXpubButton: element(by.id('show-xpub-button')),
    manageSubscriptionButton: element(by.id('manage-email-notifications-subscription-button')),
    deleteButton: element(by.id('delete-wallet-button')),

    walletInput: element(by.id('wallet-name-input')),
    submitWalletNameButton: element(by.id('submit-wallet-name-button')),

    async renameWalletTo(text: string) {
      await actions.tap(this.walletName);
      await actions.typeText(this.walletInput, text, { closeKeyboard: true, replace: true });
      await actions.tap(this.submitWalletNameButton);
    },

    async tapOnExportWalletButton() {
      await actions.tap(this.exportWalletButton);
    },

    async tapOnShowXpubButton() {
      await actions.tap(this.showXpubButton);
    },

    async tapOnManageSubscriptionButton() {
      await actions.tap(this.manageSubscriptionButton);
    },

    async tapOnDeleteWalletButton() {
      await actions.tap(this.deleteButton);
    },
  });

  const exportWalletScreen = () => ({
    qrCode: element(by.id('export-wallet-qr-code')),
    seedPhrase: element(by.id('export-wallet-seed-phrase')),
  });

  const showXpubScreen = () => ({
    qrCode: element(by.id('wallet-xpub-qr-code')),
    xpub: element(by.id('wallet-xpub')),
    copyButton: element(by.id('wallet-xpub-copy-button')),

    async tapOnCopyButton() {
      await actions.tap(this.copyButton);
    },

    async checkIfCopied() {
      // NOTE: Proper solution would be to check device clipboard
      // Currently not implemented in detox
      // https://github.com/wix/detox/issues/222
      expect(element(by.text('Copied!'))).toBeVisible();
    },
  });

  return {
    mainScreen: mainScreen(),
    exportWalletScreen: exportWalletScreen(),
    showXpubScreen: showXpubScreen(),
    deleteScreen: DeleteScreen(),
    deleteSuccessScreen: MessageScreen('success'),
  };
};

export default WalletDetails;
