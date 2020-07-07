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

  createTx(
    utxos,
    amount,
    fee,
    address,
    privateKeys = ['b2a1f7088aaa12e15d887d7f1651e16ef27ebb22911c18c3244cb6a3efce0b70'],
    vaultTxType = 2,
  ) {
    console.log('utxos', utxos);
    for (const utxo of utxos) {
      utxo.wif = this._getWifForAddress(utxo.address);
    }

    const keyPairs = privateKeys.map(p =>
      ECPair.fromPrivateKey(Buffer.from(p, BUFFER_ENCODING), {
        network: config.network,
      }),
    );

    debugger;
    const amountPlusFee = this.calculateTotalAmount({ utxos, amount, fee });

    return signer.createHDSegwitAIRTransaction({
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
