/* global , jasmine */

const { isElectrumVaultMnemonic, electrumVaultMnemonicToSeed } = require('../crypto');

global.crypto = require('crypto'); // shall be used by tests under nodejs CLI, but not in RN environment

describe('Utils crypto', () => {
  describe('isElectrumVaultMnemonic', () => {
    it('should return true for standard electrum vault mnemonic', () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
      const mnemonic = 'cram swing cover prefer miss modify ritual silly deliver chunk behind inform able';

      const res = isElectrumVaultMnemonic(mnemonic);

      expect(res).toBe(true);
    });

    it('should return true for segwit electrum vault mnemonic', () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
      const mnemonic = 'grant oval resource roast virtual wine chef inmate attack flip fresh reduce';

      const res = isElectrumVaultMnemonic(mnemonic);

      expect(res).toBe(true);
    });

    it('should return false for none electrum vault mnemonic', () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
      const mnemonic =
        'always motion fault engage bag amused monitor olympic salon obey fold practice leave doctor sunny glide resource worry urban burst park culture prize master';

      const res = isElectrumVaultMnemonic(mnemonic);

      expect(res).toBe(false);
    });
  });

  describe('electrumVaultMnemonicToSeed', () => {
    it('should parse correctly mnemonic from segwit/legacy electrum vault wallet', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
      const mnemonic = 'trouble grass flash unveil rare tragic tell scale leg rude resource tumble';

      const res = await electrumVaultMnemonicToSeed(mnemonic);

      const seed =
        '1fcd3d69dab279715ee61324cdb69b3627eb9b1815aa6be9c8ae4842a608948b325090228b55a73643e703606a401f85a52f4eb5cae458aea4dc2a34cc8915b9';

      expect(res.toString('hex')).toBe(seed);
    });

    it('should parse correctly mnemonic from segwit/legacy electrum vault wallet with password', async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;
      const mnemonic = 'say tired sand mom quiz agree member version great element globe element';

      const password = 'test password';
      const res = await electrumVaultMnemonicToSeed(mnemonic, password);

      const seed =
        'f11791bdff27e834d19bed347aa451df58e174f8fce96c9481bbaf41bb5c5c82b21248b4122a5689ede2e9000cb352ee288c5baa77d68f4d4d062815ba592926';

      expect(res.toString('hex')).toBe(seed);
    });
  });
});
