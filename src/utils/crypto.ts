import CryptoJS from 'crypto-js';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import { pbkdf2 } from 'pbkdf2';

interface GeneratePrivateKey {
  password: Buffer | string;
  salt: Buffer;
  iterations: number;
  keylen: number;
  digest: string;
}

const ELECTRUM_VAULT_SEED_PREFIXES = {
  SEED_PREFIX: '01', // Standard wallet
  SEED_PREFIX_SW: '100', // Segwit wallet
};

const ELECTRUM_VAULT_SEED_KEY = 'Seed version';

const ELECTRUM_VAULT_SEED_SALT_PREFIX = 'electrum';

export const generatePrivateKey = ({
  password,
  salt,
  iterations,
  keylen,
  digest,
}: GeneratePrivateKey): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey);
    });
  });

export const isElectrumVaultMnemonic = (mnemonic: string) => {
  const hmac = hmacSHA512(mnemonic, ELECTRUM_VAULT_SEED_KEY);
  const hex = hmac.toString(CryptoJS.enc.Hex);
  return Object.values(ELECTRUM_VAULT_SEED_PREFIXES).some(prefix => hex.startsWith(prefix));
};

export const electrumVaultMnemonicToSeed = (mnemonic: string, password = '') =>
  generatePrivateKey({
    password: mnemonic,
    salt: Buffer.from(`${ELECTRUM_VAULT_SEED_SALT_PREFIX}${password}`),
    iterations: 2048,
    keylen: 64,
    digest: 'sha512',
  });
