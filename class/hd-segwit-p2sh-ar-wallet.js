import * as bip39 from 'bip39';
import { pbkdf2 } from 'pbkdf2';
import { promisify } from 'util';

import config from '../config';
import signer from '../models/signer';
import { AbstractHDSegwitP2SHWallet } from './abstract-hd-segwit-p2sh-wallet';

const { payments, ECPair } = require('bitcoinjs-lib');

const network = config.network;
const BUFFER_ENCODING = 'hex';
export class HDSegwitP2SHArWallet extends AbstractHDSegwitP2SHWallet {
  static type = 'HDsegwitP2SHar';
  static typeReadable = 'AR';

  constructor(pubKeysHex) {
    super();
    this.pubKeysHex = pubKeysHex;
    this.pubKeys = this.pubKeysHex.map(
      p =>
        ECPair.fromPublicKey(Buffer.from(p, BUFFER_ENCODING), {
          network: config.network,
        }).publicKey,
    );
  }

  static fromJson(json) {
    const data = JSON.parse(json);
    const wallet = new HDSegwitP2SHArWallet(data.pubKeysHex);
    for (const key of Object.keys(data)) {
      // don't override values set in constructor
      if (!wallet[key]) {
        wallet[key] = data[key];
      }
    }

    return wallet;
  }

  nodeToAddress(hdNode) {
    const { address } = payments.p2sh({
      redeem: payments.p2wsh({
        redeem: payments.p2ar({
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

    if (words.length !== WORDS_LENGTH) {
      throw new Error(`Provided ${words.length} words expected ${WORDS_LENGTH}`);
    }

    const bits132 = mnemonic.split(' ').reduce((bits, word) => {
      const index = bip39.wordlists.english.indexOf(word);
      if (index === -1) {
        throw new Error(`Couldn't find index for word: ${word}`);
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

  async createTx({ utxos, amount, fee, address, mnemonics = [], privateKeys = [], vaultTxType }) {
    for (const utxo of utxos) {
      utxo.wif = this._getWifForAddress(utxo.address);
    }

    const keyPairsFromMnemonics = await Promise.all(mnemonics.map(m => this.mnemonicToKeyPair(m)));

    const keyPairsFromPrivateKeys = privateKeys.map(p =>
      ECPair.fromPrivateKey(Buffer.from(p, BUFFER_ENCODING), {
        network: config.network,
      }),
    );

    const keyPairs = [...keyPairsFromMnemonics, ...keyPairsFromPrivateKeys];

    const amountPlusFee = this.calculateTotalAmount({ utxos, amount, fee });

    return signer.createHDSegwitVaultTransaction({
      utxos,
      address,
      amount: amountPlusFee,
      fixedFee: fee,
      changeAddress: this.getAddressForTransaction(),
      pubKeys: this.pubKeys,
      keyPairs,
      vaultTxType,
    });
  }
}
