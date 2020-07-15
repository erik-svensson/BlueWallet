import * as ecurve from 'ecurve';
import { pbkdf2 } from 'pbkdf2';

const bigi = require('bigi');

interface GeneratePrivateKey {
  password: Buffer;
  salt: Buffer;
  iterations?: number;
  keylen?: number;
  digest?: string;
}

export const generatePrivateKey = ({
  password,
  salt,
  iterations = 100000,
  keylen = 32,
  digest = 'sha256',
}: GeneratePrivateKey): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey);
    });
  });

export const privateKeyToPublicKey = (privateKey: Buffer) =>
  ecurve
    .getCurveByName('secp256k1')
    .G.multiply(bigi.fromBuffer(privateKey))
    .getEncoded(false)
    .toString('hex');

export const uniqueId = (prefix = '') =>
  `${prefix}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
