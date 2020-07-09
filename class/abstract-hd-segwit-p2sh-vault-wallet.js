import * as bip39 from 'bip39';
import { pbkdf2 } from 'pbkdf2';
import { promisify } from 'util';

import config from '../config';
import signer from '../models/signer';
import { AbstractHDSegwitP2SHWallet } from './abstract-hd-segwit-p2sh-wallet';

const { payments, ECPair } = require('bitcoinjs-lib');

const i18n = require('../loc');

const network = config.network;
const BUFFER_ENCODING = 'hex';

export class AbstractHDSegwitP2SHVaultWallet extends AbstractHDSegwitP2SHWallet {
  static type = 'abstract';
  static typeReadable = 'abstract';

  constructor(pubKeysHex = []) {
    super();
    this.pubKeysHex = [...(this.pubKeysHex || []), ...pubKeysHex];
    try {
      this.pubKeys = [
        ...(this.pubKeys || []),
        ...pubKeysHex.map(
          p =>
            ECPair.fromPublicKey(Buffer.from(p, BUFFER_ENCODING), {
              network: config.network,
            }).publicKey,
        ),
      ];
    } catch (_) {
      throw new Error(i18n.wallets.errors.invalidPrivateKey);
    }
  }

  static fromJson(json) {
    const data = JSON.parse(json);
    const wallet = new this(data.pubKeysHex);
    for (const key of Object.keys(data)) {
      // don't override values set in constructor
      if (!wallet[key]) {
        wallet[key] = data[key];
      }
    }

    return wallet;
  }

  addPublicKey(publicKeyHex) {
    let publicKey;
    try {
      publicKey = ECPair.fromPublicKey(Buffer.from(publicKeyHex, BUFFER_ENCODING), {
        network: config.network,
      }).publicKey;
    } catch (error) {
      throw new Error(i18n.wallets.errors.invalidPrivateKey);
    }
    this.pubKeysHex = [...this.pubKeysHex, publicKeyHex];
    this.pubKeys = [...this.pubKeys, publicKey];
  }

  nodeToAddress(hdNode, paymentMethod) {
    const { address } = payments.p2sh({
      redeem: payments.p2wsh({
        redeem: paymentMethod({
          pubkeys: [hdNode.publicKey, ...this.pubKeys],
          network,
        }),
        network,
      }),
      network,
    });

    return address;
  }

  async mnemonicToKeyPair(mnemonic) {
    const SALT_LENGHT = 4;
    const WORD_BIT_LENGHT = 11;
    const WORDS_LENGTH = 12;

    const words = mnemonic.split(' ');

    const wordsLength = words.length;

    if (wordsLength !== WORDS_LENGTH) {
      throw new Error(
        i18n.formatString(i18n.wallets.errors.invalidMnemonicWordsNumber, {
          receivedWordsNumber: wordsLength,
          expectedWordsNumber: WORDS_LENGTH,
        }),
      );
    }

    const bits132 = mnemonic.split(' ').reduce((bits, word) => {
      const index = bip39.wordlists.english.indexOf(word);
      if (index === -1) {
        throw new Error(
          i18n.formatString(i18n.wallets.errors.noIndexForWord, {
            noIndexForWord: word,
          }),
        );
      }
      return bits + index.toString(2).padStart(WORD_BIT_LENGHT, '0');
    }, '');

    const privateKey = await promisify(pbkdf2)(
      bits132.slice(SALT_LENGHT),
      bits132.slice(0, SALT_LENGHT),
      1,
      32,
      'sha256',
    );

    return ECPair.fromPrivateKey(privateKey, {
      network: config.network,
    });
  }

  async createTx({
    utxos,
    amount,
    fee,
    address,
    mnemonics = [],
    privateKeys = [],
    keyPairs = [],
    vaultTxType,
    paymentMethod,
  }) {
    for (const utxo of utxos) {
      utxo.wif = this._getWifForAddress(utxo.address);
    }

    const keyPairsFromMnemonics = await Promise.all(mnemonics.map(m => this.mnemonicToKeyPair(m)));

    let keyPairsFromPrivateKeys = [];
    try {
      keyPairsFromPrivateKeys = privateKeys.map(p =>
        ECPair.fromPrivateKey(Buffer.from(p, BUFFER_ENCODING), {
          network: config.network,
        }),
      );
    } catch (_) {
      throw new Error(i18n.wallets.errors.inavlidPublicKey);
    }

    const amountPlusFee = this.calculateTotalAmount({ utxos, amount, fee });

    return signer.createHDSegwitVaultTransaction({
      utxos,
      address,
      amount: amountPlusFee,
      fixedFee: fee,
      changeAddress: this.getAddressForTransaction(),
      pubKeys: this.pubKeys,
      keyPairs: [...keyPairs, ...keyPairsFromMnemonics, ...keyPairsFromPrivateKeys],
      vaultTxType,
      paymentMethod,
    });
  }
}
