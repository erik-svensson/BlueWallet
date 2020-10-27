import { ECPair, VaultTxType, address, TxOutput } from 'bitcoinjs-lib';
import dayjs, { Dayjs } from 'dayjs';
import { NativeModules } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const { RNRandomBytes } = NativeModules;

import { Authenticator as IAuthenticator, FinalizedPSBT } from 'app/consts';

import config from '../config';
import { bytesToMnemonic, mnemonicToKeyPair, privateKeyToPublicKey, generatePrivateKey } from '../utils/crypto';

const i18n = require('../loc');
const signer = require('../models/signer');

const ENCODING = 'hex';
const PIN_LENGTH = 4;

export class Authenticator implements IAuthenticator {
  static randomBytesSize = 16;
  privateKey: any | null;
  publicKey: string;
  entropy: string;
  secret: string;
  keyPair: ECPair.ECPairInterface | null;
  readonly id: string;
  createdAt: Dayjs;
  exportPublicKey: string;
  words: string[];

  constructor(readonly name: string) {
    this.id = uuidv4();
    this.privateKey = null;
    this.entropy = '';
    this.publicKey = '';
    this.secret = '';
    this.exportPublicKey = '';
    this.keyPair = null;
    this.createdAt = dayjs();
    this.words = [];
  }

  static fromJson(json: string) {
    const data = JSON.parse(json);
    const { privateKey, name, createdAt } = data;

    const parsedPrivateKey = Buffer.from(privateKey.data, ENCODING);
    const authenticator = new this(name);
    for (const key of Object.keys(data)) {
      authenticator[key] = data[key];
    }

    authenticator.createdAt = dayjs(createdAt);
    authenticator.privateKey = parsedPrivateKey;
    try {
      authenticator.keyPair = ECPair.fromPrivateKey(parsedPrivateKey, {
        network: config.network,
      });
    } catch (_) {
      throw new Error(i18n.wallets.errors.invalidPrivateKey);
    }

    return authenticator;
  }

  async init() {
    try {
      await RNRandomBytes.randomBytes(Authenticator.randomBytesSize, async (err: string, bytes: any) => {
        if (err) throw new Error(err);
        // TODO: to check if encoding is correct
        const buffer = Buffer.from(bytes, 'base64');
        const mnemonic = bytesToMnemonic(buffer);
        this.secret = mnemonic || bytesToMnemonic(buffer);
        this.privateKey = await generatePrivateKey({
          salt: buffer,
          password: buffer,
        });
        this.keyPair = await mnemonicToKeyPair(mnemonic);
        this.publicKey = privateKeyToPublicKey(this.privateKey);
      });
    } catch (_) {
      throw new Error(i18n.wallets.errors.invalidPrivateKey);
    }
  }

  async signAndFinalizePSBT(encodedPSBT: string): Promise<FinalizedPSBT> {
    let tx, fee;
    let vaultTxType = VaultTxType.Recovery;
    try {
      ({ tx, fee } = signer.signAndFinalizePSBT(encodedPSBT, [this.keyPair], vaultTxType));
    } catch (_) {
      try {
        vaultTxType = VaultTxType.Instant;
        ({ tx, fee } = signer.signAndFinalizePSBT(encodedPSBT, [this.keyPair], vaultTxType));
      } catch (e) {
        throw new Error(`Unable to sign tx with authenticator: ${e.message}`);
      }
    }

    const recipients = tx.outs.map((output: TxOutput) => {
      return {
        address: address.fromOutputScript(output.script, config.network),
        value: output.value,
      };
    });

    return {
      tx,
      vaultTxType,
      recipients,
      fee,
    };
  }

  get pin() {
    return this.publicKey.slice(-PIN_LENGTH);
  }

  get QRCode() {
    return JSON.stringify({ entropy: this.entropy, name: this.name });
  }
}
