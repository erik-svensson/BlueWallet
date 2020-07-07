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

  createTx({ utxos, amount, fee, address, privateKeys = [], vaultTxType }) {
    for (const utxo of utxos) {
      utxo.wif = this._getWifForAddress(utxo.address);
    }

    const keyPairs = privateKeys.map(p =>
      ECPair.fromPrivateKey(Buffer.from(p, BUFFER_ENCODING), {
        network: config.network,
      }),
    );

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
